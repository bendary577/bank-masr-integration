import { TestBed } from '@angular/core/testing';

import { PDFServiceService } from './pdfservice.service';

describe('PDFServiceService', () => {
  let service: PDFServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDFServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
