import { TestBed } from '@angular/core/testing';

import { OperationTypesService } from './operation-types.service';

describe('OperationTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationTypesService = TestBed.get(OperationTypesService);
    expect(service).toBeTruthy();
  });
});
