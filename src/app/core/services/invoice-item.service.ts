import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publish';

import { InvoiceItem } from '../../models/invoice-item';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';


@Injectable()
export class InvoiceItemService {
  items$;
  stateManagement: StateManagement<InvoiceItem> = new StateManagement<InvoiceItem>();
  isData$: ConnectableObservable<boolean>;
  updateItem$: Observable<InvoiceItem>;
  addItem$: Observable<InvoiceItem>;
  deleteItem$: Observable<InvoiceItem>;
  constructor(private http: HttpClient) {
    this.isData$ = this.stateManagement.responseData$.scan((isData: boolean, {type}) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Remove) {
        return true;
      }
    }, false).publishBehavior(false);
    this.isData$.connect();

    this.items$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$,
    )
    .map(([entities, ids]) => {
      return ids.filter(id => entities[id]).map(id => entities[id]);
    })
    .shareReplay(1);

    this.updateItem$ = Observable.
    combineLatest(
      this.stateManagement.updateEntityId$,
      this.stateManagement.entities$
    )
    .debounceTime(10)
    .map(([id, entities]) => {
      return entities[id];
    });

    this.addItem$ = Observable.
    combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    ).
    debounceTime(10)
    .map(([entity, id]) => entity[id]);

    this.deleteItem$ = this.stateManagement.responseData$
    .filter(response => response.type === StateRequests.Remove)
    .map(res => res.value[0]);
  }
  
  getItem(id): Observable<InvoiceItem[]> {
    this.stateManagement.getList$.next(this.http.get<InvoiceItem[]>(`/invoices/${id}/items`));
    return this.items$;
  }
  
  create(item) {
    this.stateManagement.add$.next(this.http.post<InvoiceItem>(`/invoices/${item.invoice_id}/items`, item));
    return this.addItem$;
  }
  
  update(item) {
    this.stateManagement.update$.next(this.http.put<InvoiceItem>(`/invoices/${item.invoice_id}/items/${item.id}`, item));
    return this.updateItem$;
  }
  
  delete(item) {
    this.stateManagement.remove$.next(this.http.delete(`/invoices/${item.invoice_id}/items/${item.id}`).mapTo(item));
    return this.stateManagement.removeResponse$;
  }
}
