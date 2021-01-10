import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from 'src/shared/types/country';
import {DailyStat} from 'src/shared/types/daily-stat';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CovidDataService {

  BASE_API_URL = 'https://api.covid19api.com';

  constructor(private httpClient: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get(`${this.BASE_API_URL}/countries`) as Observable<Country[]>;
  }

  getDailyStatsByCountry(country: string, from: string, to: string): Observable<DailyStat[]> {
    const url = `${this.BASE_API_URL}/country/${country}?from=${from}&to=${to}`;
    return this.httpClient.get(url) as Observable<DailyStat[]>;
  }
}
