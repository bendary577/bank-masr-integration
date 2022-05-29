import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodicsProductDetailsComponent } from './foodics-product-details.component';

describe('FoodicsProductDetailsComponent', () => {
  let component: FoodicsProductDetailsComponent;
  let fixture: ComponentFixture<FoodicsProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodicsProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodicsProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
