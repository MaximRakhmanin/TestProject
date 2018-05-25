import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as requestInvoice from '../actions';
import { GetInvoiceActionTypes } from '../actions';
import { InvoiceService } from '../../../../../../../core/services/invoice.service';

@Injectable()
export class GetInvoiceEffect {

  @Effect()
  invoiceGetRequest$: Observable<Action> = this.actions$
  .ofType(GetInvoiceActionTypes.REQUEST)
  .switchMap((action: any) => {
    return this.invoiceService.invoiceRequest(action.payload)
    .map(items => new requestInvoice.GetInvoiceSuccessAction(items))
    .catch(error => Observable.of(new requestInvoice.GetInvoiceFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService

  ) {}
}