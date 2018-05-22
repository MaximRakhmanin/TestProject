import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as requestItem from '../actions';
import { InvoiceItemService } from '../../../../../../../core/services/invoice-item.service';
import 'rxjs/add/operator/do';

@Injectable()
export class ItemGetListEffect {

  @Effect()
  itemGetRequest$: Observable<Action> = this.actions$
  .ofType(requestItem.actionTypes.REQUEST)
  .switchMap((action: any) => {
    return this.invoiceItemService.getItems(action.payload)
    .map(items => new requestItem.ItemGetListSuccessAction(items))
    .catch(error => Observable.of(new requestItem.ItemGetListFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private invoiceItemService: InvoiceItemService
  ) {}
}