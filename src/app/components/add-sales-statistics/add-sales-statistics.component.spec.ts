import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesStatisticsComponent } from './add-sales-statistics.component';

describe('AddSalesStatisticsComponent', () => {
  let component: AddSalesStatisticsComponent;
  let fixture: ComponentFixture<AddSalesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
