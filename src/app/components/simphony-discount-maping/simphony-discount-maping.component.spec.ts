import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimphonyDiscountMapingComponent } from './simphony-discount-maping.component';

describe('SimphonyDiscountMapingComponent', () => {
  let component: SimphonyDiscountMapingComponent;
  let fixture: ComponentFixture<SimphonyDiscountMapingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimphonyDiscountMapingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimphonyDiscountMapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
