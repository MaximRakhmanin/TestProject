import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as requestItem from '../actions';
import { InvoiceItemService } from '../../../../../../../core/services/invoice-item.service';

@Injectable()
export class PostItemEffect {

  @Effect()
  itemGetRequest$: Observable<Action> = this.actions$
  .ofType(requestItem.ItemPutActionTypes.REQUEST)
  .switchMap((action: any) => {
    return this.invoiceItemService.createRequest(action.payload)
    .map(items => new requestItem.PostItemSuccessAction(items))
    .catch(error => Observable.of(new requestItem.PostItemFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceItemService: InvoiceItemService
  ) {}
}