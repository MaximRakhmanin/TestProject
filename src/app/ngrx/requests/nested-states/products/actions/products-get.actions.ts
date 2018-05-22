import { Action } from '@ngrx/store';

export const PRODUCTS_GET = 'Product-Get';

export const productsActionTypes = {
  REQUEST: `[${PRODUCTS_GET}] Request`,
  REQUEST_SUCCESS: `[${PRODUCTS_GET}] Request Success`,
  REQUEST_FAIL: `[${PRODUCTS_GET}] Request Fail`
};

export class ProductGetAction implements Action {
  type = productsActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class ProductGetSuccessAction implements Action {
  type = productsActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class ProductGetFailAction implements Action {
  type = productsActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type ProductsGetActions = ProductGetAction |
  ProductGetSuccessAction |
  ProductGetFailAction;