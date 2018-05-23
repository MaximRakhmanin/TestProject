import { IItemRequestState } from '../../../states';
import { createSelector } from '@ngrx/store';
import { getItemRequestState } from '../../../states/invoice-item-getters';
import { IItemPut } from './put-item.states';

export const getItemPutRequestState = createSelector(
  getItemRequestState,
  (state: IItemRequestState) => state.itemPutState
);

export const getItemPutRequestData = createSelector(
  getItemPutRequestState,
  (state: IItemPut) => state.data
);

export const getItemPutRequestLoaded = createSelector(
  getItemPutRequestState,
  (state: IItemPut) => state.loaded
);
