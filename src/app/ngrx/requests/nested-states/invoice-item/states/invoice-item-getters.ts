import { createSelector } from '@ngrx/store';
import { getRequestsState } from '../../../states/requests-getters.state';
import { IRequestState } from '../../../states';

export const getItemRequestState = createSelector(
  getRequestsState,
  (state: IRequestState) => state.invoiceItemState
);