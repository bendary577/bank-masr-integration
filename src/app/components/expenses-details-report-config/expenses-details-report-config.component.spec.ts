import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDetailsReportConfigComponent } from './expenses-details-report-config.component';

describe('ExpensesDetailsReportConfigComponent', () => {
  let component: ExpensesDetailsReportConfigComponent;
  let fixture: ComponentFixture<ExpensesDetailsReportConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesDetailsReportConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDetailsReportConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
