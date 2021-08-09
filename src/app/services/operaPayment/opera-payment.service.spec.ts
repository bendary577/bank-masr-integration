import { TestBed } from '@angular/core/testing';

import { OperaPaymentService } from './opera-payment.service';

describe('OperaPaymentService', () => {
  let service: OperaPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperaPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
