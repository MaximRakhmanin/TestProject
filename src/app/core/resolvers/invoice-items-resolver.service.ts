import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { InvoiceItemService } from '../services/invoice-item.service';
import { InvoiceItem } from '../../models/invoice-item';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMapTo';

@Injectable()
export class InvoiceItemsResolverService implements Resolve<InvoiceItem[] | boolean> {

  constructor(private invoiceItemService: InvoiceItemService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    if (id) {
      return this.invoiceItemService.stateManagement.responseDataRequests$
      .switchMapTo(this.invoiceItemService.getItem(id).take(1))
      .take(1);
    }

    return false;
  }
}
