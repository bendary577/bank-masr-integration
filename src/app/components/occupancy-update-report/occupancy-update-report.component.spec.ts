import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyUpdateReportComponent } from './occupancy-update-report.component';

describe('OccupancyUpdateReportComponent', () => {
  let component: OccupancyUpdateReportComponent;
  let fixture: ComponentFixture<OccupancyUpdateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyUpdateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyUpdateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
