import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesApiMonthlyConfigComponent } from './sales-api-monthly-config.component';

describe('SalesApiMonthlyConfigComponent', () => {
  let component: SalesApiMonthlyConfigComponent;
  let fixture: ComponentFixture<SalesApiMonthlyConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesApiMonthlyConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesApiMonthlyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
