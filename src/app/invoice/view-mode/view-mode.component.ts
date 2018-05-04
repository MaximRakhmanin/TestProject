import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductService } from '../../core/services/product.service';
import { Customer } from '../../models/customer';
import { Invoice } from '../../models/invoice';
import { InvoiceItem } from '../../models/invoice-item';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss']
})
export class ViewModeComponent implements OnInit {
  products$;
  customer$: Observable<Customer>;
  invoice$: Observable<Invoice>;
  items$: Observable<InvoiceItem[]>;
  displayedColumns = ['product', 'quantity', 'price'];
  constructor(
    private invoiceItemService: InvoiceItemService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private customerService: CustomerService) {
  }
  ngOnInit() {
    this.getListItems();
  }
  getListItems() {
    this.invoice$ = this.invoiceService.invoice$;
    this.items$ = this.invoiceItemService.collection$;
    this.products$ = this.productService.collection$;
    this.customer$ = this.invoice$.switchMap(invoice => this.customerService.getCustomer(invoice.customer_id));

    this.products$ = Observable.combineLatest(
      this.products$,
      this.items$
    )
    .map(([products, items]: [any[], any[]]) => {
      return items.map(item => {
        item.product = products.find(product => product.id === item.product_id);
        return item;
      });
    });
  }
}
