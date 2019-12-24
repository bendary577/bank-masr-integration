import { TestBed } from '@angular/core/testing';

import { SyncJobService } from './sync-job.service';

describe('SyncJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncJobService = TestBed.get(SyncJobService);
    expect(service).toBeTruthy();
  });
});
