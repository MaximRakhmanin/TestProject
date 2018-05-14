import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../services/invoice.service';

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
