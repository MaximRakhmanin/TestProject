import { initialInvoiceState } from '../states';
import { InvoiceGetListReducer } from '../nested-states/get-list-invoices/reducers';

export function invoicesGetReducer(
  state = initialInvoiceState,
  action
) {
  return{
    invoiceGetListState: InvoiceGetListReducer(state.invoiceGetListState, action)
  };
}