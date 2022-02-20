import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesApiDailyComponent } from './sales-api-daily.component';

describe('SalesApiDailyComponent', () => {
  let component: SalesApiDailyComponent;
  let fixture: ComponentFixture<SalesApiDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesApiDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesApiDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
