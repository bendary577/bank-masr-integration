import { TestBed } from '@angular/core/testing';

import { RewardPointsService } from './reward-points.service';

describe('RewardPointsService', () => {
  let service: RewardPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
