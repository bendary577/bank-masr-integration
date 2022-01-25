import { TestBed } from '@angular/core/testing';

import { TalabatService } from './talabat.service';

describe('TalabatService', () => {
  let service: TalabatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalabatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
