import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
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
  products$: Observable<Product[]>;
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
    this.items$ = this.invoiceItemService.items$;

    const products$ = this.items$
    .switchMap(items => Observable.zip(...items.map(item => this.productService.getProduct(item.product_id))));
    this.customer$ = this.invoice$.switchMap(invoice => this.customerService.getCustomer(invoice.customer_id));

    this.products$ = Observable.combineLatest(products$,
      this.invoiceItemService.items$).map(([products, items]) => {
      return products.map(product => {
        product.item = items.find(item => item.product_id === product.id);
        return product;
      });
    });
  }
}
