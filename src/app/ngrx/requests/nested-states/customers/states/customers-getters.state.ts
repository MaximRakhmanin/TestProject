import { createSelector } from '@ngrx/store';
import { getRequestsState } from '../../../states/requests-getters.state';
import { IRequestState } from '../../../states';
import { ICustomersRequest } from './customers-get.state';



export const getCustomerRequestState = createSelector(
  getRequestsState,
  (state: IRequestState) => state.customersGetState
);
export const getCustomersRequestLoader = createSelector(
  getCustomerRequestState,
  (state: ICustomersRequest) => state.loaded
);