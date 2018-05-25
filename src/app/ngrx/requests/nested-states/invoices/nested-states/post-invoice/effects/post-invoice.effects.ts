import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as requestInvoice from '../actions';
import { InvoiceService } from '../../../../../../../core/services/invoice.service';

@Injectable()
export class PostInvoiceEffect {

  @Effect()
  itemGetRequest$: Observable<Action> = this.actions$
  .ofType(requestInvoice.InvoicePostActionTypes.REQUEST)
  .switchMap((action: any) => {
    return this.invoiceService.createRequest(action.payload)
    .map(items => new requestInvoice.PostInvoiceSuccessAction(items))
    .catch(error => Observable.of(new requestInvoice.PostInvoiceFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}