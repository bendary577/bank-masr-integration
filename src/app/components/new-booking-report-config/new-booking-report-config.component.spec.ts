import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookingReportConfigComponent } from './new-booking-report-config.component';

describe('NewBookingReportConfigComponent', () => {
  let component: NewBookingReportConfigComponent;
  let fixture: ComponentFixture<NewBookingReportConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookingReportConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookingReportConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
