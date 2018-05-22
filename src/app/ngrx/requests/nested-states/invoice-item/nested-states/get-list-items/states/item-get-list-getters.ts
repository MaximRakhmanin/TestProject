import { createSelector } from '@ngrx/store';
import { getItemRequestState } from '../../../states/invoice-item-getters';
import { IItemGetList } from './item-get-lest.states';
import { IItemRequestState } from '../../../states/invoice-item.state';

export const  getItemGetListRequestState = createSelector(
  getItemRequestState,
  (state: IItemRequestState) => state.itemGetListState
);
export const getItemGetListRequestLoaded = createSelector(
  getItemGetListRequestState,
  (state: IItemGetList) => state.loaded
);