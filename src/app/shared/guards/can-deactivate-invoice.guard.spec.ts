import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateInvoiceGuard } from './can-deactivate-invoice.guard';

describe('CanDeactivateInvoiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateInvoiceGuard]
    });
  });

  it('should ...', inject([CanDeactivateInvoiceGuard], (guard: CanDeactivateInvoiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
