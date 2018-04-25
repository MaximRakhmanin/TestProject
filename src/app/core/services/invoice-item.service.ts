import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/shareReplay';

import { InvoiceItem } from '../../models/invoice-item';



@Injectable()
export class InvoiceItemService {
  items$: Observable<InvoiceItem[]>;
  constructor(private http: HttpClient) {}
  getItem(id): Observable<InvoiceItem[]> {
   return this.items$ = this.http.get<InvoiceItem[]>(`/invoices/${id}/items`)
   .shareReplay(1)
     .catch(err => Observable.throw(err));
  }
  setItem(id, item) {
    return this.http.post<InvoiceItem>(`/invoices/${id}/items`, item)
      .catch(err => Observable.throw(err));
  }
  update(invoice_id, item_id, item) {
    return this.http.put(`/invoices/${invoice_id}/items/${item_id}`, item);
  }
  delete(invoice_id, id) {
    return this.http.delete(`/invoices/${invoice_id}/items/${id}`)
      .catch(err => Observable.throw(err));
  }
}
