import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVoucherConfigComponent } from './payment-voucher-config.component';

describe('PaymentVoucherConfigComponent', () => {
  let component: PaymentVoucherConfigComponent;
  let fixture: ComponentFixture<PaymentVoucherConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentVoucherConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentVoucherConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
