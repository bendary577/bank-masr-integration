import { TestBed } from '@angular/core/testing';

import { PosSalesService } from './pos-sales.service';

describe('PosSalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosSalesService = TestBed.get(PosSalesService);
    expect(service).toBeTruthy();
  });
});
