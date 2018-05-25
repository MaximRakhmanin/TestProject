import { IRequestState } from '../../../states';
import { getRequestsState } from '../../../states/requests-getters.state';
import { createSelector } from '@ngrx/store';

export const getInvoiceRequestState = createSelector(
  getRequestsState,
  (state: IRequestState) => state.invoicesGetState
);