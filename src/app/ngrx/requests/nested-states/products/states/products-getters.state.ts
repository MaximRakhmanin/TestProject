
import { createSelector } from '@ngrx/store';
import { getRequestsState } from '../../../states/requests-getters.state';
import { IRequestState } from '../../../states';
import { IProductRequest } from './products-get.state';


export const getProductRequestState = createSelector(
  getRequestsState,
  (state: IRequestState) => state.productsGetState
);
export const getProductRequestLoader = createSelector(
  getProductRequestState,
  (state: IProductRequest) => state.loaded
);