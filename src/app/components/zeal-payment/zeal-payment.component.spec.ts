import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealPaymentComponent } from './zeal-payment.component';

describe('ZealPaymentComponent', () => {
  let component: ZealPaymentComponent;
  let fixture: ComponentFixture<ZealPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
