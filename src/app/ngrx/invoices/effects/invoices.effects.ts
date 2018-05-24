import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as invoices from '../actions';
import * as requestInvoice from '../../requests/nested-states/invoices/nested-states/get-list-invoices/actions';

@Injectable()
export class InvoiceEffects {
  @Effect()
  items$ = this.actions$
  .ofType(invoices.Get_List)
  .map((action: any) => {
    return new requestInvoice.InvoiceGetListAction(action.payload);
  });

  @Effect()
  itemsRequest$: Observable<Action> = this.actions$
  .ofType<invoices.invoiceActions>(requestInvoice.actionTypes.REQUEST_SUCCESS)
  .map(items => {
    return new invoices.GetListSuccessFullInvoices(items.payload);
  });

  //@Effect()
  //itemPost$ = this.actions$
  //.ofType(invoices.Post_Invoice)
  //.map((action: any) => {
  //  return new PostInvoiceAction(action.payload);
  //});
  //
  //@Effect()
  //itemPostRequest$ = this.actions$
  //.ofType(ItemPostActionTypes.REQUEST_SUCCESS)
  //.map((action: any) => {
  //  return new invoices.PostInvoiceSuccessFull([action.payload]);
  //});
  //
  //@Effect()
  //itemPut$ = this.actions$
  //.ofType(invoices.Put_Invoice)
  //.map((action: any) => {
  //  return new PutItemAction(action.payload);
  //});
  //
  //@Effect()
  //itemPutRequest$ = this.actions$
  //.ofType(ItemPutActionTypes.REQUEST_SUCCESS)
  //.map((action: any) => {
  //  return new invoices.PutInvoiceSuccessFull([action.payload]);
  //});
  //
  //@Effect()
  //itemDelete$ = this.actions$
  //.ofType(invoices.Delete_Invoice)
  //.map((action: any) => {
  //  return new DeleteItemAction(action.payload);
  //});
  //
  //@Effect()
  //itemDeleteRequest$ = this.actions$
  //.ofType(ActionTypes.REQUEST_SUCCESS)
  //.map((action: any) => {
  //  return new invoices.DeleteInvoiceSuccessFull([action.payload]);
  //});

  constructor(
    private actions$: Actions,
  ) {}
}