import { getInvoiceRequestState } from '../../../states/invoice-get-getters.state';
import { createSelector } from '@ngrx/store';
import { IInvoiceRequestState } from '../../../states';
import { IInvoiceGetList } from './get-list-invoices.state';

export const getInvoicesListRequestState = createSelector(
  getInvoiceRequestState,
  (state: IInvoiceRequestState) => state.invoiceGetListState
);

export const getInvoicesListRequestLoaded = createSelector(
  getInvoicesListRequestState,
  (state: IInvoiceGetList) => state.loaded
);