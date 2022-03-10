import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorOrdersComponent } from './aggregator-orders.component';

describe('AggregatorOrdersComponent', () => {
  let component: AggregatorOrdersComponent;
  let fixture: ComponentFixture<AggregatorOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
