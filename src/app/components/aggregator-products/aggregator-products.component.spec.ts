import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorProductsComponent } from './aggregator-products.component';

describe('AggregatorProductsComponent', () => {
  let component: AggregatorProductsComponent;
  let fixture: ComponentFixture<AggregatorProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
