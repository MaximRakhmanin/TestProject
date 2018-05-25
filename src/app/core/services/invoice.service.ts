import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/startWith';

import { Invoice } from '../../models/invoice';
import { CustomerService } from './customer.service';
import { InvoiceItemService } from './invoice-item.service';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

import { getCustomersEntities } from '../../ngrx/customers/states/customers-getters.states';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state/app-state';
import { GetListInvoices } from '../../ngrx/invoices/actions';
import { getCollectionsInvoices } from '../../ngrx/invoices/states/invoices-getters.state';
import { DeleteInvoice } from '../../ngrx/invoices/actions';
import { PostInvoice } from '../../ngrx/invoices/actions';
import { GetInvoice, PutInvoice } from '../../ngrx/invoices/actions';

import {
  getInvoiceDeleteRequestData
} from '../../ngrx/requests/nested-states/invoices/nested-states/delete-invoice/states/delete-invoice-getters.state';

import {
  getInvoicePostRequestData
} from '../../ngrx/requests/nested-states/invoices/nested-states/post-invoice/states/post-invoice-getters.state';
import {
  getInvoicePutRequestData
} from '../../ngrx/requests/nested-states/invoices/nested-states/put-invoice/states/put-invoice-getters.state';

import {
  getInvoiceGetRequestData
} from '../../ngrx/requests/nested-states/invoices/nested-states/get-invoice/states/get-invoice-getters.state';
import {
  getInvoicesListRequestLoaded
} from '../../ngrx/requests/nested-states/invoices/nested-states/get-list-invoices/states/get-list-invoices-getters.state';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class InvoiceService {

  invoices$: Observable<Invoice[]>;
  invoice$: Observable<Invoice>;

  addInvoice$: Observable<Invoice>;
  deleteInvoice$: Observable<Invoice>;
  updateInvoice$: Observable<Invoice>;

  isData$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService,
    private store: Store<AppState>
  ) {

    this.isData$ = this.store.select(getInvoicesListRequestLoaded);

    this.invoices$ = this.store.select(getCollectionsInvoices)
    // add customer
    .combineLatest(this.store.select(getCustomersEntities).startWith({}))
    .map(([invoices, customers]) => {
      return invoices.map(invoice => ({
        ...invoice,
        customer: customers[invoice.customer_id],
      }));
    })
    // add items
    .combineLatest(this.invoiceItemService.items$.startWith([]))
    .map(([invoices, item]) => {
      return invoices.map((invoice) => {
        const items = item.filter(i => i.invoice_id === invoice.id);
        return {...invoice, items};
      });
    })
    .shareReplay(1);

    this.invoice$ = this.store.select(getInvoiceGetRequestData)
    .filter(invoice => !!invoice)
    .combineLatest(this.store.select(getCustomersEntities).startWith({}))
    .map(([invoice, customers]) => {
      return {
        ...invoice,
        customer: customers[invoice.customer_id],
      };
    })
    .combineLatest(this.invoiceItemService.items$.startWith([]))
    .map(([invoice, item]) => {
      const items = item.filter(({id}) => item.invoice_id === id);
      return {...invoice, items };
    })
    .share();

    this.addInvoice$ = this.store.select(getInvoicePostRequestData);

    this.deleteInvoice$ = this.store.select(getInvoiceDeleteRequestData);

    this.updateInvoice$ = this.store.select(getInvoicePutRequestData);
  }


  invoicesRequest() {
    return this.http.get<Invoice[]>('/invoices');
  }

  invoiceRequest(id): Observable<Invoice> {
    return this.http.get<Invoice>(`/invoices/${id}`);
  }

  createRequest(invoice) {
    return this.http.post<Invoice>('/invoices', invoice, httpOptions);
  }

  deleteRequest(invoice) {
    return this.http.delete<Invoice>(`/invoices/${invoice.id}`, httpOptions);
  }

  updateRequest(invoice) {
    return this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice);
  }

  getInvoices() {
    this.store.dispatch(new GetListInvoices());
    return this.invoices$;
  }

  deleteInvoice(invoice) {
    this.store.dispatch(new DeleteInvoice(invoice));
    return this.deleteInvoice$;
  }

  createInvoice(invoice) {
    this.store.dispatch(new PostInvoice(invoice));
    return this.addInvoice$;
  }

  updateInvoice(invoice) {
    this.store.dispatch(new PutInvoice(invoice));
    return this.updateInvoice$;
  }

  getInvoice(id) {
    this.store.dispatch(new GetInvoice(id));
    return this.invoice$;
  }
}
