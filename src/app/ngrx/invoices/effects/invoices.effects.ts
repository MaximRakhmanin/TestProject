import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as invoices from '../actions';
import * as requestInvoice from '../../requests/nested-states/invoices/nested-states/get-list-invoices/actions';
import {
  InvoicePostActionTypes,
  PostInvoiceAction
} from '../../requests/nested-states/invoices/nested-states/post-invoice/actions';
import {
  InvoicePutActionTypes,
  PutInvoiceAction
} from '../../requests/nested-states/invoices/nested-states/put-invoice/actions';
import {
  GetInvoiceAction,
  GetInvoiceActionTypes
} from '../../requests/nested-states/invoices/nested-states/get-invoice/actions';
import {
  ActionTypes,
  DeleteInvoiceAction
} from '../../requests/nested-states/invoices/nested-states/delete-invoice/actions';

@Injectable()
export class InvoiceEffects {
  @Effect()
  invoices$ = this.actions$
  .ofType(invoices.Get_List)
  .map((action: any) => {
    return new requestInvoice.InvoiceGetListAction(action.payload);
  });

  @Effect()
  invoicesRequest$: Observable<Action> = this.actions$
  .ofType<invoices.invoiceActions>(requestInvoice.actionTypes.REQUEST_SUCCESS)
  .map(invoice => {
    return new invoices.GetListSuccessFullInvoices(invoice.payload);
  });

  @Effect()
  invoicePost$ = this.actions$
  .ofType(invoices.Post_Invoice)
  .map((action: any) => {
    return new PostInvoiceAction(action.payload);
  });

  @Effect()
  invoicePostRequest$ = this.actions$
  .ofType(InvoicePostActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoices.PostInvoiceSuccessFull([action.payload]);
  });

  @Effect()
  invoicePut$ = this.actions$
  .ofType(invoices.Put_Invoice)
  .map((action: any) => {
    return new PutInvoiceAction(action.payload);
  });

  @Effect()
  invoicePutRequest$ = this.actions$
  .ofType(InvoicePutActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoices.PutInvoiceSuccessFull([action.payload]);
  });

  @Effect()
  invoiceDelete$ = this.actions$
  .ofType(invoices.Delete_Invoice)
  .map((action: any) => {
    return new DeleteInvoiceAction(action.payload);
  });

  @Effect()
  invoiceDeleteRequest$ = this.actions$
  .ofType(ActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoices.DeleteInvoiceSuccessFull([action.payload]);
  });

  @Effect()
  invoiceGet$ = this.actions$
  .ofType(invoices.Get_Invoice)
  .map((action: any) => {
    return new GetInvoiceAction(action.payload);
  });

  @Effect()
  invoiceGetRequest$ = this.actions$
  .ofType(GetInvoiceActionTypes.REQUEST_SUCCESS)
  .map((action: any) => {
    return new invoices.GetInvoiceSuccessFull(action.payload);
  });

  constructor(
    private actions$: Actions,
  ) {}
}