import { IProductsState } from '../product/states';
import { productReducer } from '../product/reducers';
import { requestReducer } from '../requests/reducers';
import { IRequestState } from '../requests/states';

export interface AppState {
  readonly products: IProductsState;
  readonly requests: IRequestState;
}
export const reducers = {
  products: productReducer,
  requests: requestReducer,
};
