import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
import { SearchQuery } from '../search-query';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public query: SearchQuery;

  constructor(
    public weatherApiService: WeatherApiService
  ) { }

  ngOnInit(): void {
  }

  search(query: SearchQuery): void {
    this.weatherApiService.fetchByZipCode(query)
    .subscribe(
      res => {
        this.query = {
          units: query.units,
          zipCode: query.zipCode,
          apiRes: res
        }
      }
    )
  }
}
