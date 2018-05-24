import { IProductRequest } from '../nested-states/products/states';
import { ICustomersRequest } from '../nested-states/customers/states';
import { IItemRequestState } from '../nested-states/invoice-item/states';
import { IInvoiceRequestState } from '../nested-states/invoices/states';

export interface IRequestState {
  productsGetState?: IProductRequest;
  customersGetState?: ICustomersRequest;
  invoiceItemState?: IItemRequestState;
  invoicesGetState?: IInvoiceRequestState;
}

export const requestsInitialState: IRequestState = {};