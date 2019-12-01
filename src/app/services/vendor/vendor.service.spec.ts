import { TestBed } from '@angular/core/testing';

import { VednorService } from './vendor.service';

describe('VednorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VednorService = TestBed.get(VednorService);
    expect(service).toBeTruthy();
  });
});
