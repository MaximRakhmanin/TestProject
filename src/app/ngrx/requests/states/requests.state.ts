import { IProductRequest } from '../nested-states/products/states';
import { ICustomersRequest } from '../nested-states/customers/states';
import { IItemRequestState } from '../nested-states/invoice-item/states';

export interface IRequestState {
  productsGetState?: IProductRequest;
  customersGetState?: ICustomersRequest;
  invoiceItemState?: IItemRequestState;
}

export const requestsInitialState: IRequestState = {};