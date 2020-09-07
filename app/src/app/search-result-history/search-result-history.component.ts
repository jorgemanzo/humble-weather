import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../weather';
@Component({
  selector: 'app-search-result-history',
  templateUrl: './search-result-history.component.html',
  styleUrls: ['./search-result-history.component.scss']
})
export class SearchResultHistoryComponent implements OnInit {

  @Input() weatherHistory: [Weather]
  
  constructor() { }

  ngOnInit(): void {
  }

  getHistory(): [Weather] {
    if (this.weatherHistory) {
      return this.weatherHistory
    }
    return [{
      locationID: 0,
      temp: 0,
      units: "",
      humidity: 0,
      date: ""
    }]
  }
  showTable(): boolean {
    if (this.weatherHistory) {
      return this.weatherHistory.length > 0 ? true : false;
    }
    return false
  }
}
