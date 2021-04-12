import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyUpdateReportConfigComponent } from './occupancy-update-report-config.component';

describe('OccupancyUpdateReportConfigComponent', () => {
  let component: OccupancyUpdateReportConfigComponent;
  let fixture: ComponentFixture<OccupancyUpdateReportConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyUpdateReportConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyUpdateReportConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
