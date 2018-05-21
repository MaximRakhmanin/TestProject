import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/startWith';

import { Invoice } from '../../models/invoice';
import { CustomerService } from './customer.service';
import { InvoiceItemService } from './invoice-item.service';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import { getCustomersEntities } from '../../ngrx/customers/states/customers-getters.states';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state/app-state';


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

  isData$: ConnectableObservable<boolean>;

  stateManagement: StateManagement<Invoice> = new StateManagement<Invoice>();

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService,
    private store: Store<AppState>
  ) {

    this.invoices$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$,
    )
    .map(([entities, ids]) => {
      return ids.filter(id => entities[id]).map(id => entities[id]);
    })
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

    this.invoice$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.entityId$,
    )
    .map(([entities, id]) => entities[id])
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

    this.addInvoice$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$,
    )
    .debounceTime(10)
    .map(([entities, id]) => entities[id]);

    this.deleteInvoice$ = this.stateManagement.responseData$
    .filter(response => response.type === StateRequests.Remove)
    .map(res => res.value[0]);

    this.updateInvoice$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.updateEntityId$,
    )
    .debounceTime(10)
    .map(([entities, id]) => entities[id]);

    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Remove) {
        return true;
      }
    }, false)
    .publishBehavior(false);
    this.isData$.connect();
  }

  getInvoices() {
    this.stateManagement.getList$.next(this.http.get<Invoice[]>('/invoices'));
    return this.invoices$;
  }

  getInvoice(id): Observable<Invoice> {
    this.stateManagement.get$.next(this.http.get<Invoice>(`/invoices/${id}`));
    return this.invoice$;
  }

  setInvoice(invoice) {
    this.stateManagement.add$.next(this.http.post<Invoice>('/invoices', invoice, httpOptions));
    return this.addInvoice$;
  }

  delete(id) {
    this.stateManagement.remove$.next(this.http.delete<Invoice>(`/invoices/${id}`, httpOptions));
    return this.deleteInvoice$;
  }

  update(invoice) {
    this.stateManagement.update$.next(this.http.put<Invoice>(`/invoices/${invoice.id}`, invoice));
    return this.updateInvoice$;
  }
}
