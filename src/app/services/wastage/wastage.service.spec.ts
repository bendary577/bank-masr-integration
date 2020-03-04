import { TestBed } from '@angular/core/testing';

import { WastageService } from './wastage.service';

describe('WastageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WastageService = TestBed.get(WastageService);
    expect(service).toBeTruthy();
  });
});
