import { productGetReducer } from '../nested-states/products/reducers';
import { IRequestState, requestsInitialState } from '../states';
import { customersGetReducer } from '../nested-states/customers/reducers';
import { itemReducer } from '../nested-states/invoice-item/reducers';
import { invoicesGetReducer } from '../nested-states/invoices/reducers/invoices-reducer';


export function requestReducer(
  state = requestsInitialState,
  action
): IRequestState {
  return{
    productsGetState: productGetReducer(state.productsGetState, action),
    customersGetState: customersGetReducer(state.customersGetState, action),
    invoiceItemState: itemReducer(state.invoiceItemState, action),
    invoicesGetState: invoicesGetReducer(state.invoicesGetState, action),
  };
  }
