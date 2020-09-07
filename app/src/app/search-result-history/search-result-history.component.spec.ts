import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultHistoryComponent } from './search-result-history.component';

describe('SearchResultHistoryComponent', () => {
  let component: SearchResultHistoryComponent;
  let fixture: ComponentFixture<SearchResultHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
