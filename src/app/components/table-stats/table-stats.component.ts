import {Component, Input, OnInit} from '@angular/core';
import {DailyStat} from 'src/shared/types/daily-stat';

@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent implements OnInit {

  @Input()
  countryData: DailyStat[];

  @Input()
  displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
