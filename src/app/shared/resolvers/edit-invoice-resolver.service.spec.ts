import { TestBed, inject } from '@angular/core/testing';

import { EditInvoiceResolverService } from './edit-invoice-resolver.service';

describe('EditInvoiceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditInvoiceResolverService]
    });
  });

  it('should be created', inject([EditInvoiceResolverService], (service: EditInvoiceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
