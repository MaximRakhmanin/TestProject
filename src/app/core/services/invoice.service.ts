import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Invoice } from '../../models/invoice';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class InvoiceService {
  invoices$: Observable<Invoice[]>;
  invoice$: Observable<Invoice>;
  constructor(private http: HttpClient) { }
  getInvoices() {
   return this.invoices$ = this.http.get<Invoice[]>('/invoices').shareReplay(1)
   .catch(error => Observable.throw(error));
  }
  getInvoice(id): Observable<Invoice> {
    return this.invoice$ = this.http.get<Invoice>(`/invoices/${id}`).shareReplay(1)
    .catch(error => Observable.throw(error));
  }
  setInvoice(invoice) {
    return this.http.post('/invoices', invoice, httpOptions)
      .catch(error => Observable.throw(error));
  }
  delete(id) {
    return this.http.delete(`/invoices/${id}`, httpOptions)
    .catch(error => {
     return  Observable.throw(error);
    });
  }
  update(id, invoice) {
    return this.http.put<Invoice>(`/invoices/${id}`, invoice, httpOptions)
    .catch(error => Observable.throw(error));
  }
}
