import { Action } from '@ngrx/store';

export const PRODUCTS_GET = 'Product-Get';

export const actionTypes = {
  REQUEST: `[${PRODUCTS_GET}] Request`,
  REQUEST_SUCCESS: `[${PRODUCTS_GET}] Request Success`,
  REQUEST_FAIL: `[${PRODUCTS_GET}] Request Fail`
};

export class ProductGetAction implements Action {
  type = actionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class ProductGetSuccessAction implements Action {
  type = actionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class ProductGetFailAction implements Action {
  type = actionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type Actions = ProductGetAction |
  ProductGetSuccessAction |
  ProductGetFailAction;