import { IProductsState } from '../product/states';
import { IProductRequest } from '../requests/nested-states/products/states';

export interface AppState {
  readonly products: IProductsState;
  readonly request: IProductRequest;
}

