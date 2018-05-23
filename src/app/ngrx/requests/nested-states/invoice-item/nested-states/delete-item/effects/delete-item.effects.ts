import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as requestItem from '../actions';
import { InvoiceItemService } from '../../../../../../../core/services/invoice-item.service';
import { ActionTypes } from '../actions';

@Injectable()
export class DeleteItemEffect {

  @Effect()
  itemGetRequest$: Observable<Action> = this.actions$
  .ofType(ActionTypes.REQUEST)
  .switchMap((action: any) => {
    return this.invoiceItemService.deleteRequest(action.payload)
    .map(items => new requestItem.DeleteItemSuccessAction(items))
    .catch(error => Observable.of(new requestItem.DeleteItemFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceItemService: InvoiceItemService
  ) {}
}