import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Invoice } from '../../models/invoice';
import { StateManagement, StateRequests } from './state-management';
import { ConnectableObservable } from 'rxjs/Rx';
import { Action } from '../../models/action';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class InvoiceService {
  invoices$: ConnectableObservable<Invoice[]>;
  invoice$: ConnectableObservable<Invoice>;
  addInvoice$: ConnectableObservable<Invoice>;
  deleteInvoice$: ConnectableObservable<Invoice>;
  updateInvoice$: ConnectableObservable<Invoice>;
  isData$: ConnectableObservable<boolean>;
  stateManagement: StateManagement<Invoice> = new StateManagement<Invoice>();
  constructor(
    private http: HttpClient) {
    this.invoices$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
    .map(([entities, ids]) =>
      ids.map(id => entities[id])
    )
    .publishReplay(1);
    this.invoices$.connect();

    this.invoice$ = Observable.combineLatest(
      this.stateManagement.entityId$,
      this.stateManagement.entities$
    )
    .map(([id, entities]) => {
      return entities[id];
    }).publishReplay(1);
    this.invoice$.connect();

    this.addInvoice$ = Observable.combineLatest(
      this.stateManagement.addEntityId$,
      this.stateManagement.entities$
    )
    .map(([id, entities]) => {
      return entities[id];
    }).publishReplay(1);
    this.invoice$.connect();

    this.deleteInvoice$ = this.stateManagement.responseData$
    .filter(response => response.type === StateRequests.Remove)
    .map(res => res.value[0])
    .publishReplay(1);
    this.deleteInvoice$.connect();

    this.updateInvoice$ = Observable.
    combineLatest(
      this.stateManagement.updateId$,
      this.stateManagement.entities$
    )
    .map(([id, entities]) => {
      return entities[id];
    }).publishReplay(1);
    this.updateInvoice$.connect();

    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}: Action) => {
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
  update(id, invoice) {
    this.stateManagement.update$.next(this.http.put<Invoice>(`/invoices/${id}`, invoice, httpOptions));
    return this.updateInvoice$;
  }
}
