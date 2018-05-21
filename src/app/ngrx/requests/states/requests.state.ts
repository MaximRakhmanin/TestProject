import { IProductRequest } from '../nested-states/products/states';
import { ICustomersRequest } from '../nested-states/customers/states';

export interface IRequestState {
  productsGetState?: IProductRequest;
  customersGetState?: ICustomersRequest;
}

export const requestsInitialState: IRequestState = {};