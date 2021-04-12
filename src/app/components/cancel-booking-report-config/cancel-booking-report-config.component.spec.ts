import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBookingReportConfigComponent } from './cancel-booking-report-config.component';

describe('CancelBookingReportConfigComponent', () => {
  let component: CancelBookingReportConfigComponent;
  let fixture: ComponentFixture<CancelBookingReportConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelBookingReportConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBookingReportConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
