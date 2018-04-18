import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class InvoiceItemService {
  items$: Observable<InvoiceItem[]>;
  products$: Observable<Product[]>;
  customer$: Observable<Customer>;
  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService
  ) {}
  getItem(id): Observable<InvoiceItem[]> {
    this.invoiceService.getInvoice(id);
   return this.items$ = this.http.get<InvoiceItem[]>(`/invoices/${id}/items`);
  }
  setItem(id, item): Observable<InvoiceItem[]> {
    return this.http.post<InvoiceItem[]>(`/invoices/${id}/items`, item, httpOptions);
  }
}
