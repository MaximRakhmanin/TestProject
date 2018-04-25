import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../services/invoice.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvoiceResolverService implements Resolve<Invoice> {

  constructor(private invoiceService: InvoiceService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
    const id = route.paramMap.get('id');
   return this.invoiceService.getInvoice(id);
  }
}
