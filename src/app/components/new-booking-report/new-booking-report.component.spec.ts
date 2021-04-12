import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookingReportComponent } from './new-booking-report.component';

describe('NewBookingReportComponent', () => {
  let component: NewBookingReportComponent;
  let fixture: ComponentFixture<NewBookingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
