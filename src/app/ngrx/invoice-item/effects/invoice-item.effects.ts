import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as invoiceItemActions from '../actions';
import * as requestItemsActions from '../../requests/nested-states/invoice-item/actions';
import {
  ItemPostActionTypes,
  PostItemAction
} from '../../requests/nested-states/invoice-item/nested-states/post-item/actions';

@Injectable()
export class InvoiceItemEffects {
  @Effect()
  items$ = this.actions$
  .ofType(invoiceItemActions.Get_List)
  .map((action: any) => {
    return new requestItemsActions.ItemGetListAction(action.payload);
  });

  @Effect()
  itemsRequest$: Observable<Action> = this.actions$
  .ofType<invoiceItemActions.itemActions>(requestItemsActions.actionTypes.REQUEST_SUCCESS)
  .map(items => {
    return new invoiceItemActions.GetListSuccessFullItem(items.payload);
  });

  @Effect()
  itemPost$ = this.actions$
  .ofType(invoiceItemActions.Post_Item)
  .map((action: any) => {
    return new PostItemAction(action.payload);
  });

  @Effect()
  itemPostRequest$ = this.actions$
  .ofType(ItemPostActionTypes.REQUEST_SUCCESS)
  .map((item: any) => {
    return new invoiceItemActions.PostItemSuccessFull([item.payload]);
  });
  constructor(
    private actions$: Actions,
  ) {
  }
}