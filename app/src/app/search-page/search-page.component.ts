import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
import { LocationsService } from '../locations.service';
import { WeatherStatesService } from '../weather-states.service';
import { SearchQuery } from '../search-query';
import { ExecutionMessage } from '../execution-message';
import { Weather } from '../weather';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public query: SearchQuery;
  public weatherStates: [Weather];

  constructor(
    public weatherApiService: WeatherApiService,
    public locationsService: LocationsService,
    public weatherStatesService: WeatherStatesService
  ) { }

  ngOnInit(): void {
  }

  getWeatherHistoryForLocation (query: SearchQuery) : void {
    this.weatherStatesService.selectWeatherStatesByQuery(query).subscribe(
      res => this.weatherStates = res.results
    )
  }

  storeWeatherForLocation (execMsg: ExecutionMessage, query: SearchQuery) : void {
    this.weatherStatesService.insertWeatherState({
      locationID: execMsg.ID,
      temp: Math.floor(query.apiRes.main.temp),
      units: query.units == "imperial" ? "F" : "C",
      humidity: query.apiRes.main.humidity,
      date: ""
    }).subscribe(
      execMsg => {
        console.log(execMsg)
        this.getWeatherHistoryForLocation(query)
      }
    )
  }

  createOrSaveLocation (query: SearchQuery) : void {
    this.locationsService.upsertLocationWithQuery(query)
    .subscribe(
      execMsg => {
        console.log(execMsg)
        this.storeWeatherForLocation(execMsg, query)
      }
    )
  }

  search (query: SearchQuery) : void {
    this.weatherApiService.fetchByZipCode(query)
    .subscribe(
      res => {
        this.query = {
          units: query.units,
          zipCode: query.zipCode,
          apiRes: res
        }
        this.createOrSaveLocation(this.query)
      }
    )
  }
}
