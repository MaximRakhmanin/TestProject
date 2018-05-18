import { IProductsState } from '../product/states';
import { IProductRequest } from '../requests/nested-states/products/states';
import { productReducer } from '../product/reducers';
import { requestReducer } from '../requests/reducers';
import { combineReducers } from '@ngrx/store';

export interface AppState {
  readonly products: IProductsState;
  readonly request: IProductRequest;
  readonly getProduct;
}
const reducers = {
  products: productReducer,
  request: requestReducer,
};
const devRed = combineReducers(reducers);
export function appReducer(state: any, action) {
  return devRed(state, action);
}