import { getInvoiceRequestState } from '../../../states/invoice-get-getters.state';
import { createSelector } from '@ngrx/store';
import { IInvoiceRequestState } from '../../../states';
import { IInvoiceDelete } from './delete-invoice.state';

export const getInvoiceDeleteRequestState = createSelector(
  getInvoiceRequestState,
  (state: IInvoiceRequestState) => state.invoiceDeleteState
);

export const getInvoiceDeleteRequestData = createSelector(
  getInvoiceDeleteRequestState,
  (state: IInvoiceDelete) => state.data
);




