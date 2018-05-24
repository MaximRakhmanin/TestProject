import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as requestInvoice from '../actions';
import { InvoiceService } from '../../../../../../../core/services/invoice.service';

@Injectable()
export class InvoiceGetListEffect {

  @Effect()
  invoiceGetRequest$: Observable<Action> = this.actions$
  .ofType(requestInvoice.actionTypes.REQUEST)
  .switchMap((action) => {
    return this.invoiceService.invoicesRequest()
    .map(items => new requestInvoice.InvoiceGetListSuccessAction(items))
    .catch(error => Observable.of(new requestInvoice.InvoiceGetListFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}