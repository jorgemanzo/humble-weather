import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchQuery } from '../search-query';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public zipCode: string = ""
  public message: string = ""
  public units: string = "imperial"

  @Output() searchEvent = new EventEmitter<SearchQuery>();

  constructor( ) { }

  ngOnInit(): void {
  }

  go(): void {
    const zip = +this.zipCode
    if(!zip) {
      this.message = "Please type a proper ZipCode"
    } else {
      this.message = "All good!"
      this.searchEvent.emit({
        zipCode: this.zipCode,
        units: this.units,
        apiRes: null
      })
    }
  }
}
