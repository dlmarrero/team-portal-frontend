import { TestBed, inject } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { HttpClientModule } from '@angular/common/http';

describe('CalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CalendarService]
    });
  });

  it('should be created', inject([CalendarService], (service: CalendarService) => {
    expect(service).toBeTruthy();
  }));
});
