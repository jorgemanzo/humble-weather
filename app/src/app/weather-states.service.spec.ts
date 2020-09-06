import { TestBed } from '@angular/core/testing';

import { WeatherStatesService } from './weather-states.service';

describe('WeatherStatesService', () => {
  let service: WeatherStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
