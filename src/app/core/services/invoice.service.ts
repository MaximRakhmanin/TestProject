import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Invoice } from '../../models/invoice';


@Injectable()
export class InvoiceService {
  invoices$: Observable<Invoice[]>;
  constructor(private http: HttpClient) { }
  getInvoices() {
    this.invoices$ = this.http.get<Invoice[]>('/invoices');
  }
  getInvoice(id): Observable<Invoice> {
    return this.http.get<Invoice>(`/invoices/${id}`);
  }
}
