import { TestBed } from '@angular/core/testing';

import { AggregatorIntegratorService } from './aggregator-integrator.service';

describe('AggregatorIntegratorService', () => {
  let service: AggregatorIntegratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregatorIntegratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
