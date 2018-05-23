import { IItemRequestState } from '../../../states';
import { createSelector } from '@ngrx/store';
import { getItemRequestState } from '../../../states/invoice-item-getters';
import { IItemDelete } from './delete-item.state';

export const getItemDeleteRequestState = createSelector(
  getItemRequestState,
  (state: IItemRequestState) => state.itemDeleteState
);

export const getItemDeleteRequestData = createSelector(
  getItemDeleteRequestState,
  (state: IItemDelete) => state.data
);

export const getItemDeleteRequestLoaded = createSelector(
  getItemDeleteRequestState,
  (state: IItemDelete) => state.loaded
);