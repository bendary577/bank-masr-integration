import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealPaymentConfigComponent } from './zeal-payment-config.component';

describe('ZealPaymentConfigComponent', () => {
  let component: ZealPaymentConfigComponent;
  let fixture: ComponentFixture<ZealPaymentConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealPaymentConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealPaymentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
