import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../services/invoice.service';

@Injectable()
export class InvoicesResolverService implements Resolve<Invoice[]> {

  constructor(private invoiceService: InvoiceService) { }
  resolve(): Observable<Invoice[]> {
    if (this.invoiceService.invoices$) {
      return this.invoiceService.invoices$;
    }
   return this.invoiceService.getInvoices();
  }
}
