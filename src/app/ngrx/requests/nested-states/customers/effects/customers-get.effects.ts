import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as customersRequestActions from '../actions';
import { CustomerService } from '../../../../../core/services/customer.service';

@Injectable()
export class CustomersGetEffect {

  @Effect()
  productGetRequest$: Observable<Action> = this.actions$
  .ofType(customersRequestActions.CustomersActionTypes.REQUEST)
  .switchMap(action => {
    return this.customerService.CustomersRequest()
    .map(customers => new customersRequestActions.CustomersGetSuccessAction(customers))
    .catch(error => Observable.of(new customersRequestActions.CustomersGetFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
  ) {}
}