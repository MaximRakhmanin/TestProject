import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
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
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';

import { InvoiceItem } from '../../models/invoice-item';
import { PostItem } from '../../ngrx/invoice-item/actions';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app-state/app-state';
import { GetListItem, PutItem } from '../../ngrx/invoice-item/actions';
import { getCollectionsInvoiceItem} from '../../ngrx/invoice-item/states/invoice-item-getters.state';
import {
getItemGetListRequestLoaded
} from '../../ngrx/requests/nested-states/invoice-item/nested-states/get-list-items/states/item-get-list-getters';
import { getItemPutRequestData } from '../../ngrx/requests/nested-states/invoice-item/nested-states/put-item/states/put-item-getters.state';
import { getItemPostData } from '../../ngrx/requests/nested-states/invoice-item/nested-states/post-item/states/post-item-getters.states';


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

    this.addItem$ = this.store.select(getItemPostData).skip(1);

    this.updateItem$ = this.store.select(getItemPutRequestData);
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

  getItemsRequest(id): Observable<InvoiceItem[]> {
    return this.http.get<InvoiceItem[]>(`/invoices/${id}/items`);
  }

  createRequest(item) {
    return this.http.post<InvoiceItem>(`/invoices/${item.invoice_id}/items`, item);
  }

  updateRequest(item) {
   return this.http.put<InvoiceItem>(`/invoices/${item.invoice_id}/items/${item.id}`, item);
  }

  delete(item) {
    this.stateManagement.remove$.next(this.http.delete(`/invoices/${item.invoice_id}/items/${item.id}`).mapTo(item));
    return this.stateManagement.removeResponse$;
  }
  getListItems(id: number | string) {
    this.store.dispatch(new GetListItem(id));
    return this.items$;
  }
  postItem(item) {
    this.store.dispatch(new PostItem(item));
    return this.addItem$;
  }
  updateItem(item) {
    this.store.dispatch(new PutItem(item));
    return this.updateItem$;
  }
}
