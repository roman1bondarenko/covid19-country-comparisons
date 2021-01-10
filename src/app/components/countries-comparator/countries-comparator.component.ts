import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {combineLatest} from 'rxjs';

import {Country} from 'src/shared/types/country';
import {DailyStat} from 'src/shared/types/daily-stat';
import {CovidDataService} from 'src/app/services/covid-data.service';
import {dateMapper} from '../../helpers/common';

@Component({
  selector: 'app-countries-comparator',
  templateUrl: './countries-comparator.component.html',
  styleUrls: ['./countries-comparator.component.css']
})
export class CountriesComparatorComponent implements OnInit {

  @Input()
  firstSelectedCountry: string;

  @Input()
  secondSelectedCountry: string;

  firstCountryData: DailyStat[];
  secondCountryData: DailyStat[];

  countries = new Map<string, Country>();
  countriesNames: Country[] = [];

  displayedTableColumns = ['Confirmed', 'Deaths', 'Recovered', 'Active', 'Date'];

  dateRange = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  });

  isLoading = false;

  constructor(private covidDataService: CovidDataService) {}

  ngOnInit(): void {
    this.loadCountryList();
  }

  loadCountryList(): void {
    this.covidDataService
      .getCountries()
      .subscribe(countries => {
        countries.forEach(c => this.countries.set(c.Slug, c));

        this.countriesNames = countries.sort((a, b) => {
          if (a.Country > b.Country) { return 1; }
          if (a.Country < b.Country) { return -1; }
          return 0;
        });
      });
  }

  compareCountries(): any {
    this.isLoading = true;

    if (!this.firstSelectedCountry || !this.secondSelectedCountry) {
      alert('You must select two countries!');

      return this.isLoading = false;
    }
    const dateFilterRange: [string, string] = [
        new Date(this.dateRange.get('from').value).toISOString(),
        new Date(this.dateRange.get('to').value).toISOString()
      ];

    combineLatest([
        this.covidDataService.getDailyStatsByCountry(
          this.firstSelectedCountry,
          ...dateFilterRange
        ),
        this.covidDataService.getDailyStatsByCountry(
          this.secondSelectedCountry,
          ...dateFilterRange
        ),
      ]).subscribe(
        ([firstCountryData, secondCountryData]) => {
          this.firstCountryData = firstCountryData.map(dateMapper);
          this.secondCountryData = secondCountryData.map(dateMapper);

          this.isLoading = false;
        }
      );
  }

  clearFilters(): void {
    this.firstSelectedCountry = undefined;
    this.secondSelectedCountry = undefined;
    this.dateRange.reset();
  }

}
