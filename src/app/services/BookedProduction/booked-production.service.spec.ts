import { TestBed } from '@angular/core/testing';

import { BookedProductionService } from './booked-production.service';

describe('BookedProductionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookedProductionService = TestBed.get(BookedProductionService);
    expect(service).toBeTruthy();
  });
});
