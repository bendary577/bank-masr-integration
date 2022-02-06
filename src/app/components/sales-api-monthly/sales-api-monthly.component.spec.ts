import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesApiMonthlyComponent } from './sales-api-monthly.component';

describe('SalesApiMonthlyComponent', () => {
  let component: SalesApiMonthlyComponent;
  let fixture: ComponentFixture<SalesApiMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesApiMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesApiMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
