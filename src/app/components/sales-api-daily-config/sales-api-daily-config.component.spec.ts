import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesApiDailyConfigComponent } from './sales-api-daily-config.component';

describe('SalesApiDailyConfigComponent', () => {
  let component: SalesApiDailyConfigComponent;
  let fixture: ComponentFixture<SalesApiDailyConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesApiDailyConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesApiDailyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
