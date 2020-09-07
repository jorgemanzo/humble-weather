import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExecutionMessage } from './execution-message';
import { SearchQuery } from './search-query';
import { Weather } from './weather';
import { QueryResultMessage } from './query-result-message';
@Injectable({
  providedIn: 'root'
})
export class WeatherStatesService {
  private readonly apiURL = 'http://localhost:8080';
  private readonly apiInsertWeatherState = '/insert_weather_state';
  private readonly apiSelectWeatherStates = '/select_weather_states'
  constructor(
    private http: HttpClient
  ) { }

  insertWeatherState(weatherDef: Weather): Observable<ExecutionMessage> {
    return this.http.post<ExecutionMessage>(this.apiURL + this.apiInsertWeatherState, JSON.stringify(weatherDef))
  }

  selectWeatherStatesByQuery(query: SearchQuery): Observable<QueryResultMessage> {
    return this.http.post<QueryResultMessage>(this.apiURL + this.apiSelectWeatherStates, JSON.stringify(query))
  }
}
