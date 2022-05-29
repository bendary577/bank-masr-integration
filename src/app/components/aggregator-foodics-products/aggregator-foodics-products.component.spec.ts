import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorFoodicsProductsComponent } from './aggregator-foodics-products.component';

describe('AggregatorFoodicsProductsComponent', () => {
  let component: AggregatorFoodicsProductsComponent;
  let fixture: ComponentFixture<AggregatorFoodicsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorFoodicsProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorFoodicsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
