import { TestBed } from '@angular/core/testing';

import { NewBookingReportService } from './new-booking-report.service';

describe('NewBookingReportService', () => {
  let service: NewBookingReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewBookingReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
