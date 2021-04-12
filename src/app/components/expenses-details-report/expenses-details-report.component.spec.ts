import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDetailsReportComponent } from './expenses-details-report.component';

describe('ExpensesDetailsReportComponent', () => {
  let component: ExpensesDetailsReportComponent;
  let fixture: ComponentFixture<ExpensesDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
