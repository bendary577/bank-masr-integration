import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimphonyPaymentComponent } from './simphony-payment.component';

describe('SimphonyPaymentComponent', () => {
  let component: SimphonyPaymentComponent;
  let fixture: ComponentFixture<SimphonyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimphonyPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimphonyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
