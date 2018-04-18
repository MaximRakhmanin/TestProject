import { TestBed, inject } from '@angular/core/testing';

import { NewInvoiceResolverService } from './new-invoice-resolver.service';

describe('NewInvoiceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewInvoiceResolverService]
    });
  });

  it('should be created', inject([NewInvoiceResolverService], (service: NewInvoiceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
