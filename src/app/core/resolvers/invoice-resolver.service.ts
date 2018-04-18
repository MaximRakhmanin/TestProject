import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../services/invoice.service';

@Injectable()
export class InvoiceResolverService implements Resolve<Invoice[]> {

  constructor(private invoiceService: InvoiceService) { }
  resolve(): Observable<Invoice[]> {
   return this.invoiceService.getInvoices();
  }
}
