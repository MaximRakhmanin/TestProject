import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as requestInvoice from '../actions';
import { ActionTypes } from '../actions';
import { InvoiceService } from '../../../../../../../core/services/invoice.service';

@Injectable()
export class DeleteInvoiceEffect {

  @Effect()
  invoiceDeleteRequest$: Observable<Action> = this.actions$
  .ofType(ActionTypes.REQUEST)
  .switchMap((action: any) => {
    debugger;
    return this.invoiceService.deleteRequest(action.payload)
    .map(items => new requestInvoice.DeleteInvoiceSuccessAction(items))
    .catch(error => Observable.of(new requestInvoice.DeleteInvoiceFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService

  ) {}
}