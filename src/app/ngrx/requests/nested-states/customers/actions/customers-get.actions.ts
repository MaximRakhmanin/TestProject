import { Action } from '@ngrx/store';

export const CUSTOMER_GET = 'Customer-Get';

export const actionTypes = {
  REQUEST: `[${CUSTOMER_GET}] Request`,
  REQUEST_SUCCESS: `[${CUSTOMER_GET}] Request Success`,
  REQUEST_FAIL: `[${CUSTOMER_GET}] Request Fail`
};

export class CustomersGetAction implements Action {
  type = actionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class CustomersGetSuccessAction implements Action {
  type = actionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class CustomersGetFailAction implements Action {
  type = actionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type customersGetActions = CustomersGetAction |
  CustomersGetSuccessAction |
  CustomersGetFailAction;