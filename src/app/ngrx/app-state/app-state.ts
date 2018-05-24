import { IProductsState } from '../product/states';
import { productReducer } from '../product/reducers';
import { requestReducer } from '../requests/reducers';
import { IRequestState } from '../requests/states';
import { ICustomersState } from '../customers/states';
import { customersReducer } from '../customers/reducers';
import { invoiceItemReducer } from '../invoice-item/reducers';
import { IItemState } from '../invoice-item/states';
import { IInvoiceState } from '../invoices/states';
import { invoicesReducer } from '../invoices/reducers/invoices.reducers';

export interface AppState {
  readonly products: IProductsState;
  readonly requests: IRequestState;
  readonly customers: ICustomersState;
  readonly invoiceItem: IItemState;
  readonly invoices: IInvoiceState;
}
export const reducers = {
  products: productReducer,
  requests: requestReducer,
  customers: customersReducer,
  invoiceItem: invoiceItemReducer,
  invoices: invoicesReducer,
};
