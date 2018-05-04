import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/take';

import { Action } from '../../models/action';
import { InvoiceItem } from '../../models/invoice-item';

import { StateManagement, StateRequests } from './state-management';


@Injectable()
export class InvoiceItemService {
  collection$: ConnectableObservable<InvoiceItem[]>;;
  stateManagement: StateManagement<InvoiceItem> = new StateManagement<InvoiceItem>();
  isData$: ConnectableObservable<boolean>;
  updateItem$: ConnectableObservable<InvoiceItem>;
  addItem$: ConnectableObservable<InvoiceItem>;
  deleteItem$: ConnectableObservable<InvoiceItem>;
  constructor(private http: HttpClient) {
    this.isData$ = this.stateManagement.responseData$.scan((isData: boolean, {type}: Action) => {
      if (+type === StateRequests.GetList || +type === StateRequests.Add || +type === StateRequests.Remove) {
        return true;
      }
    }, false).publishBehavior(false);
    this.isData$.connect();
    this.collection$ = Observable.
    combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
    .map(([entities, ids]) => {
      return ids.map(id => entities[id]);
    }).publishReplay(1);
    this.collection$.connect();

    this.updateItem$ = Observable.
    combineLatest(
      this.stateManagement.updateId$,
      this.stateManagement.entities$
    )
    .map(([id, entities]) => {
      return entities[id];
    }).publishReplay(1);
    this.updateItem$.connect();

    this.addItem$ = Observable.
    combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
    .map(([entity, id]) => entity[id]).publishReplay(1);
    this.addItem$.connect();

    this.deleteItem$ = this.stateManagement.responseData$
    .filter(response => response.type === StateRequests.Remove)
    .map(res => res.value[0])
    .publishReplay(1);
    this.deleteItem$.connect();
  }
  getItem(id): Observable<InvoiceItem[]> {
    this.stateManagement.getList$.next(this.http.get<InvoiceItem[]>(`/invoices/${id}/items`));
    return this.collection$;
  }
  setItem(id, item) {
    this.stateManagement.add$.next(this.http.post<InvoiceItem>(`/invoices/${id}/items`, item));
    return this.addItem$;
  }
  update(invoice_id, item_id, item) {
    this.stateManagement.update$.next(this.http.put<InvoiceItem>(`/invoices/${invoice_id}/items/${item_id}`, item));
    return this.updateItem$;
  }
  delete(invoice_id, id) {
    this.stateManagement.remove$.next(this.http.delete<InvoiceItem>(`/invoices/${invoice_id}/items/${id}`));
    return this.deleteItem$;
  }
}
