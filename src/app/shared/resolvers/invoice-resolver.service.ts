import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { InvoiceService } from '../../core/services/invoice.service';

@Injectable()
export class InvoiceResolverService implements Resolve<void> {

  constructor(private invoiceService: InvoiceService) { }
  resolve() {
    this.invoiceService.getInvoices();
  }
}
