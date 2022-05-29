import { TestBed } from '@angular/core/testing';

import { FoodicsServiceService } from './foodics-service.service';

describe('FoodicsServiceService', () => {
  let service: FoodicsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodicsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
