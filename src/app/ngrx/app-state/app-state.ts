import { IProductsState } from '../product/states';
import { productReducer } from '../product/reducers';
import { requestReducer } from '../requests/reducers';
import { IRequestState } from '../requests/states';
import { ICustomersState } from '../customers/states';
import { customersReducer } from '../customers/reducers';

export interface AppState {
  readonly products: IProductsState;
  readonly requests: IRequestState;
  readonly customers: ICustomersState;
}
export const reducers = {
  products: productReducer,
  requests: requestReducer,
  customers: customersReducer,
};
