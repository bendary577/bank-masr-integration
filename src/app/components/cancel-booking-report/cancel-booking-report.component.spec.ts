import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBookingReportComponent } from './cancel-booking-report.component';

describe('CancelBookingReportComponent', () => {
  let component: CancelBookingReportComponent;
  let fixture: ComponentFixture<CancelBookingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelBookingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBookingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
