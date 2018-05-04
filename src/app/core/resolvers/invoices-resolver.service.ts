import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../services/invoice.service';
import 'rxjs/add/operator/take';

@Injectable()
export class InvoicesResolverService implements Resolve<Invoice[]> {

  constructor(private invoiceService: InvoiceService) { }
  resolve(): Observable<Invoice[]> {
    const invoice = this.invoiceService.isData$.switchMap(isData => {
      if (isData) {
        return this.invoiceService.invoices$;
      }
      return this.invoiceService.getInvoices();
    }).take(1);
    return invoice;
  }
}
