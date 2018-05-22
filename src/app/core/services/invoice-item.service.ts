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
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/debounceTime';

import { InvoiceItem } from '../../models/invoice-item';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state/app-state';
import { GetListItem } from '../../ngrx/invoice-item/actions';
import { getCollectionsInvoiceItem, getCurrentItem } from '../../ngrx/invoice-item/states/invoice-item-getters.state';
import {
  getItemGetListRequestLoaded
} from '../../ngrx/requests/nested-states/invoice-item/nested-states/get-list-items/states/item-get-list-getters';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import { PostItem } from '../../ngrx/invoice-item/actions/invoice-item.actions';
import 'rxjs/add/operator/skip';


@Injectable()
export class InvoiceItemService {
  items$;
  isData$: Observable<boolean>;

  stateManagement: StateManagement<InvoiceItem> = new StateManagement<InvoiceItem>();
  updateItem$: Observable<InvoiceItem>;
  addItem$: Observable<InvoiceItem>;
  deleteItem$: Observable<InvoiceItem>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.items$ = this.store.select(getCollectionsInvoiceItem)
    .withLatestFrom(this.store.select(getItemGetListRequestLoaded))
    .filter(([items, isData]) => isData)
    .map(([items, isData]) => items);

    this.addItem$ = this.store.select(getCurrentItem).skip(1);
    //this.items$.subscribe(console.log);
    //this.updateItem$ = Observable.
    //combineLatest(
    //  this.stateManagement.updateEntityId$,
    //  this.stateManagement.entities$
    //)
    //.debounceTime(10)
    //.map(([id, entities]) => {
    //  return entities[id];
    //});
    //
    //this.addItem$ = Observable.
    //combineLatest(
    //  this.stateManagement.entities$,
    //  this.stateManagement.addEntityId$
    //).
    //debounceTime(10)
    //.map(([entity, id]) => entity[id]);
    //
    //this.deleteItem$ = this.stateManagement.responseData$
    //.filter(response => response.type === StateRequests.Remove)
    //.map(res => res.value[0]);
  }

  getItems(id): Observable<InvoiceItem[]> {
    return this.http.get<InvoiceItem[]>(`/invoices/${id}/items`);
  }

  create(item) {
    return this.http.post<InvoiceItem>(`/invoices/${item.invoice_id}/items`, item);
  }

  update(item) {
    this.stateManagement.update$.next(this.http.put<InvoiceItem>(`/invoices/${item.invoice_id}/items/${item.id}`, item));
    return this.updateItem$;
  }

  delete(item) {
    this.stateManagement.remove$.next(this.http.delete(`/invoices/${item.invoice_id}/items/${item.id}`).mapTo(item));
    return this.stateManagement.removeResponse$;
  }
  getListItemsDispatch(id: number | string) {
    this.store.dispatch(new GetListItem(id));
    return this.items$;
  }
  postItemDispatch(item) {
    this.store.dispatch(new PostItem(item));
    return this.addItem$;
  }
}
