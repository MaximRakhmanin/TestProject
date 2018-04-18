import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Invoice } from '../../models/invoice';
import 'rxjs/add/operator/map';

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
   return this.invoices$ = this.http.get<Invoice[]>('/invoices');
  }
  getInvoice(id): Observable<Invoice> {
    return this.invoice$ = this.http.get<Invoice>(`/invoices/${id}`);
  }
  setInvoice(invoice) {
    return this.http.post('/invoices', invoice, httpOptions);
  }
  delete(id) {
    return this.http.delete(`/invoices/${id}`, httpOptions);
  }
}
