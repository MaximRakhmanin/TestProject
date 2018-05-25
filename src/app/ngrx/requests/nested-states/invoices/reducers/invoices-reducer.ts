import { initialInvoiceState } from '../states';
import { InvoiceGetListReducer } from '../nested-states/get-list-invoices/reducers';
import { InvoiceDeleteReducer } from '../nested-states/delete-invoice/reducers';
import { InvoicePostReducer } from '../nested-states/post-invoice/reducers';
import { InvoicePutReducer } from '../nested-states/put-invoice/reducers';
import { InvoiceGetReducer } from '../nested-states/get-invoice/reducers';

export function invoicesGetReducer(
  state = initialInvoiceState,
  action
) {
  return{
    invoiceGetListState: InvoiceGetListReducer(state.invoiceGetListState, action),
    invoiceDeleteState: InvoiceDeleteReducer(state.invoiceDeleteState, action),
    invoicePostState: InvoicePostReducer(state.invoicePostState, action),
    invoicePutState: InvoicePutReducer(state.invoicePutState, action),
    invoiceGetState: InvoiceGetReducer(state.invoiceGetState, action),
  };
}