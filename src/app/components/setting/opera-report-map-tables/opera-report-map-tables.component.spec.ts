import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaReportMapTablesComponent } from './opera-report-map-tables.component';

describe('OperaReportMapTablesComponent', () => {
  let component: OperaReportMapTablesComponent;
  let fixture: ComponentFixture<OperaReportMapTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperaReportMapTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaReportMapTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
