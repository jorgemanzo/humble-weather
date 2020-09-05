import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchQuery } from './search-query';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private apiKey: string = "c9f441bf569115c6f07e94a8457d9c4b"

  constructor(
    public httpClient: HttpClient
  ) { }

  private apiURL(zipCode: string, units: string): string {
    return `http://api.openweathermap.org/data/2.5/weather?q=${zipCode}&units=${units}&appid=${this.apiKey}`
  }

  fetchByZipCode(query: SearchQuery): Observable<any> {
    return this.httpClient.get(this.apiURL(query.zipCode, query.units))
  }

}
