import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { InvoiceItemService } from '../../core/services/invoice-item.service';

@Injectable()
export class InvoiceItemResolverService implements Resolve<any> {

  constructor(private invoiceItemService: InvoiceItemService) { }
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this.invoiceItemService.getItem(id);
  }
}
