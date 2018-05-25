import { IInvoiceRequestState } from '../../../states';
import { getInvoiceRequestState } from '../../../states/invoice-get-getters.state';
import { createSelector } from '@ngrx/store';
import { IInvoiceGet } from './get-invoice-state';

export const getInvoiceGetRequestState = createSelector(
  getInvoiceRequestState,
  (state: IInvoiceRequestState) => state.invoiceGetState
);

export const getInvoiceGetRequestData = createSelector(
  getInvoiceGetRequestState,
  (state: IInvoiceGet) => state.data
);