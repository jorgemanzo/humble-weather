import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExecutionMessage } from './execution-message';
import { Weather } from './weather'
@Injectable({
  providedIn: 'root'
})
export class WeatherStatesService {
  private readonly apiURL = 'http://localhost:8080';
  private readonly apiInsertWeatherState = '/insert_weather_state';
  constructor(
    private http: HttpClient
  ) { }

  insertWeatherState(weatherDef: Weather): Observable<ExecutionMessage> {
    return this.http.post<ExecutionMessage>(this.apiURL + this.apiInsertWeatherState, JSON.stringify(weatherDef))
  }
}
