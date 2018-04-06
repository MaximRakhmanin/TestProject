import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { InvoiceItem } from '../../models/invoice-item';
import { Product } from '../../models/product';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/combineLatest';
import { ProductService } from './product.service';
import { InvoiceService } from './invoice.service';
import { CustomerService } from './customer.service';
import { Invoice } from '../../models/invoice';
import { Customer } from '../../models/customer';

@Injectable()
export class InvoiceItemService {
  items$: Observable<InvoiceItem[]>;
  products$: Observable<Product[]>;
  invoice$: Observable<Invoice>;
  customer$: Observable<Customer>;
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) {}
  getItem(id) {
    this.items$ = this.http.get<InvoiceItem[]>(`/invoices/${id}/items`);
    this.invoice$ = this.invoiceService.getInvoice(id);
    this.products$ = this.items$
    .switchMap(items => Observable.zip(...items.map(item => this.productService.getProduct(item.product_id))));
    this.customer$ = this.invoice$.switchMap(invoice => this.customerService.getCustomer(invoice.customer_id));
  }
}
