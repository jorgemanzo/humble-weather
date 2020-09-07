import { Component, OnInit, Input } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';
import { SearchQuery } from '../search-query';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public city: string = ""
  public temp: string = ""
  public humidity: string = ""
  public condition: string = ""
  public zipCode: string = ""
  public showCard: boolean = false

  @Input()
  set query(query: SearchQuery) {
    if(query) {
      const units = query.units == "imperial" ? "°F" : "°C"
      this.city = `Weather for ${query.apiRes.name}`
      this.temp = `${Math.floor(query.apiRes.main.temp)}${units}, feels like ${Math.floor(query.apiRes.main.feels_like)}${units}`
      this.humidity = `Humidity: ${query.apiRes.main.humidity}%`
      this.condition = query.apiRes.weather.main
      this.zipCode = query.zipCode
      this.showCard = true
    }
  }
  constructor(
    public weatherApiService: WeatherApiService
  ) { }

  ngOnInit(): void {
  }
 
}
