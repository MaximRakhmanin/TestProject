import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { InvoiceItemService } from '../services/invoice-item.service';
import { InvoiceItem } from '../../models/invoice-item';

@Injectable()
export class EditInvoiceResolverService implements Resolve<InvoiceItem[]> {

  constructor(
    private invoiceItemService: InvoiceItemService,
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
   return this.invoiceItemService.getItem(id);
  }
}
