import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/withLatestFrom';

import { AppState } from '../../ngrx/app-state/app-state';
import { InvoiceItem } from '../../models/invoice-item';
import { DeleteItem, PostItem } from '../../ngrx/invoice-item/actions';

import { GetListItem, PutItem } from '../../ngrx/invoice-item/actions';
import { getCollectionsInvoiceItem} from '../../ngrx/invoice-item/states/invoice-item-getters.state';
import {
  getItemGetListRequestLoaded
} from '../../ngrx/requests/nested-states/invoice-item/nested-states/get-list-items/states/item-get-list-getters';
import { getItemPutRequestData } from '../../ngrx/requests/nested-states/invoice-item/nested-states/put-item/states/put-item-getters.state';
import { getItemPostData } from '../../ngrx/requests/nested-states/invoice-item/nested-states/post-item/states/post-item-getters.states';
import {
  getItemDeleteRequestData,
  getItemDeleteRequestLoaded
} from '../../ngrx/requests/nested-states/invoice-item/nested-states/delete-item/states/delete-item-getters.state';


@Injectable()
export class InvoiceItemService {
  items$;
  isData$: Observable<boolean>;

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

    this.isData$ = this.store.select(getItemDeleteRequestLoaded);

    this.addItem$ = this.store.select(getItemPostData).skip(1);

    this.updateItem$ = this.store.select(getItemPutRequestData);

    this.deleteItem$ = this.store.select(getItemDeleteRequestData);
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

  deleteRequest(item) {
    return this.http.delete(`/invoices/${item.invoice_id}/items/${item.id}`).mapTo(item);
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

  deleteItem(item) {
    this.store.dispatch(new DeleteItem(item));
    return this.deleteItem$;
  }
}
