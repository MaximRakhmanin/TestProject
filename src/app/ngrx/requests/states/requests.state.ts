import { IProductRequest } from '../nested-states/products/states';

export interface IRequestState {
  productsGetState?: IProductRequest;
}

export const requestInitialState: IRequestState = {};