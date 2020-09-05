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

  @Input() query: SearchQuery;
  @Input()
  set apiResponse(apiRes: any) {
    if(apiRes && this.query) {
      const units = this.query.units == "imperial" ? "°F" : "°C"
      this.city = `Weather for ${apiRes.name}`
      this.temp = `${apiRes.main.temp}${units}, feels like ${apiRes.main.feels_like}${units}`
      this.humidity = `Humidity: ${apiRes.main.humidity}%`
      this.condition = apiRes.weather.main
    }
  }
  constructor(
    public weatherApiService: WeatherApiService
  ) { }

  ngOnInit(): void {
  }
 
  showResults(): void {
    console.log(this.apiResponse)
  }
}
