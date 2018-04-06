import { TestBed, inject } from '@angular/core/testing';

import { EditInvoiceService } from './edit-invoice.service';

describe('EditInvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditInvoiceService]
    });
  });

  it('should be created', inject([EditInvoiceService], (service: EditInvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
