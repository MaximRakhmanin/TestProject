import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as invoiceItem from '../actions';
import * as requestItems from '../../requests/nested-states/invoice-item/actions';
import {
  ItemPutActionTypes,
  PostItemAction
} from '../../requests/nested-states/invoice-item/nested-states/post-item/actions';
import {
  ItemsPutActionTypes,
  PutItemAction
} from '../../requests/nested-states/invoice-item/nested-states/put-item/actions';
import {
  ActionTypes,
  DeleteItemAction
} from '../../requests/nested-states/invoice-item/nested-states/delete-item/actions';

@Injectable()
export class InvoiceItemEffects {
  @Effect()
  items$ = this.actions$
  .ofType(invoiceItem.Get_List)
  .map((action: any) => {
    return new requestItems.ItemGetListAction(action.payload);
  });

  @Effect()
  itemsRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItem.itemActions>(requestItems.actionTypes.REQUEST_SUCCESS)
  .map(items => {
    return new invoiceItem.GetListSuccessFullItem(items.payload);
  });

  @Effect()
  itemPost$ = this.actions$
  .ofType(invoiceItem.Post_Item)
  .map((action: any) => {
    return new PostItemAction(action.payload);
  });

  @Effect()
  itemPostRequest$ = this.actions$
  .ofType(ItemsPutActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoiceItem.PostItemSuccessFull([action.payload]);
  });

  @Effect()
  itemPut$ = this.actions$
  .ofType(invoiceItem.Put_Item)
  .map((action: any) => {
    return new PutItemAction(action.payload);
  });

  @Effect()
  itemPutRequest$ = this.actions$
  .ofType(ItemsPutActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoiceItem.PutItemSuccessFull([action.payload]);
  });

  @Effect()
  itemDelete$ = this.actions$
  .ofType(invoiceItem.Delete_Item)
  .map((action: any) => {
    return new DeleteItemAction(action.payload);
  });

  @Effect()
  itemDeleteRequest$ = this.actions$
  .ofType(ActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoiceItem.DeleteItemSuccessFull([action.payload]);
  });

  constructor(
    private actions$: Actions,
  ) {}
}