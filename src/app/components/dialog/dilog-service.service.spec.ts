import { TestBed } from '@angular/core/testing';

import { DilogServiceService } from './dilog-service.service';

describe('DilogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DilogServiceService = TestBed.get(DilogServiceService);
    expect(service).toBeTruthy();
  });
});
