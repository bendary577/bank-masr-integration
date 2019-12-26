import { TestBed } from '@angular/core/testing';

import { WasteService } from './waste.service';

describe('WasteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WasteService = TestBed.get(WasteService);
    expect(service).toBeTruthy();
  });
});
