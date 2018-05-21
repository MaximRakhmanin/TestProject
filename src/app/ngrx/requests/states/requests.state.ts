import { IProductRequest } from '../nested-states/products/states';
import { ICustomersRequest } from '../nested-states/customers/states';
import { IItemState } from '../nested-states/invoice-item/states/invoice-item.state';

export interface IRequestState {
  productsGetState?: IProductRequest;
  customersGetState?: ICustomersRequest;
  invoiceItemState?: IItemState;
}

export const requestsInitialState: IRequestState = {};