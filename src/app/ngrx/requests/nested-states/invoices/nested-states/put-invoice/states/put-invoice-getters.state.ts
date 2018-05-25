import { getInvoiceRequestState } from '../../../states/invoice-get-getters.state';
import { createSelector } from '@ngrx/store';
import { IInvoiceRequestState } from '../../../states';
import { IInvoicePut } from './put-invoice.states';

export const  getInvoicePutRequestState = createSelector(
  getInvoiceRequestState,
  (state: IInvoiceRequestState) => state.invoicePutState
);

export const getInvoicePutRequestData = createSelector(
  getInvoicePutRequestState,
  (state: IInvoicePut) => state.data
);
