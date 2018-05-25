import { createSelector } from '@ngrx/store';
import { IInvoiceRequestState } from '../../../states';
import { IInvoicePost } from './post-invoice.state';
import { getInvoiceRequestState } from '../../../states/invoice-get-getters.state';

export const  getInvoicePostRequestState = createSelector(
  getInvoiceRequestState,
  (state: IInvoiceRequestState) => state.invoicePostState
);

export const getInvoicePostRequestData = createSelector(
  getInvoicePostRequestState,
  (state: IInvoicePost) => state.data
);