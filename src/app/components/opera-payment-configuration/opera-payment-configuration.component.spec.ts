import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaPaymentConfigurationComponent } from './opera-payment-configuration.component';

describe('OperaPaymentConfigurationComponent', () => {
  let component: OperaPaymentConfigurationComponent;
  let fixture: ComponentFixture<OperaPaymentConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperaPaymentConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaPaymentConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
