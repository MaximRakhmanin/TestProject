import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as invoiceItemActions from '../actions';
import * as requestItemsActions from '../../requests/nested-states/invoice-item/actions';

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
  constructor(
    private actions$: Actions,
  ) {
  }
}