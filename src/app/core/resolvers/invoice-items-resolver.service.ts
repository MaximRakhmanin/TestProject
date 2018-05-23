import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publish';

import { InvoiceItem } from '../../models/invoice-item';
import { InvoiceItemService } from '../services/invoice-item.service';

@Injectable()
export class InvoiceItemsResolverService implements Resolve<InvoiceItem[] | boolean> {

  constructor(
    private invoiceItemService: InvoiceItemService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    if (id) {
      return this.invoiceItemService.getListItems(id).take(1);
    }
    return false;
  }
}
