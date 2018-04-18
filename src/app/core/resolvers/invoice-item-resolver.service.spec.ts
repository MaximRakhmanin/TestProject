import { TestBed, inject } from '@angular/core/testing';

import { InvoiceItemResolverService } from './invoice-item-resolver.service';

describe('InvoiceItemResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceItemResolverService]
    });
  });

  it('should be created', inject([InvoiceItemResolverService], (service: InvoiceItemResolverService) => {
    expect(service).toBeTruthy();
  }));
});
