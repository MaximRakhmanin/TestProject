import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as customerActions from '../actions/customers.actions';
import * as requestCustomersActions from '../../requests/nested-states/customers/actions';
import { CustomersGetAction } from '../../requests/nested-states/customers/actions';

@Injectable()
export class CustomersEffects {
  @Effect()
  customers$ = this.actions$
  .ofType(customerActions.Get_List)
  .map(() => {
    return new CustomersGetAction();
  });

  @Effect()
  customersRequest$: Observable<Action> = this.actions$
  .ofType<customerActions.CustomersActions>(requestCustomersActions.CustomersActionTypes.REQUEST_SUCCESS)
  .map(customers => {
    return new customerActions.GetListSuccessFullCustomers(customers.payload);
  });
  constructor(
    private actions$: Actions,
  ) {
  }
}