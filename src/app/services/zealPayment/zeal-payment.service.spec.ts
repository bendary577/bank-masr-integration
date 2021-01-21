import { TestBed } from '@angular/core/testing';

import { ZealPaymentService } from './zeal-payment.service';

describe('ZealPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZealPaymentService = TestBed.get(ZealPaymentService);
    expect(service).toBeTruthy();
  });
});
