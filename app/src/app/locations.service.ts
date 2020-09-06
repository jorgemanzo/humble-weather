import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchQuery } from './search-query';
import { ExecutionMessage } from './execution-message';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private readonly apiURL = 'http://localhost:8080';
  private readonly apiUpsertLocationWithQuery = '/upsert_location_with_query';
  constructor(
    private http: HttpClient
  ) { }

  upsertLocationWithQuery(query: SearchQuery): Observable<ExecutionMessage> {
    return this.http.post<ExecutionMessage>(this.apiURL + this.apiUpsertLocationWithQuery, JSON.stringify(query))
  }
}
