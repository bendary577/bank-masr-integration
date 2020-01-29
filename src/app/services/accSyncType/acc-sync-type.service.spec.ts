import { TestBed } from '@angular/core/testing';

import { AccSyncTypeService } from './acc-sync-type.service';

describe('AccSyncTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccSyncTypeService = TestBed.get(AccSyncTypeService);
    expect(service).toBeTruthy();
  });
});
