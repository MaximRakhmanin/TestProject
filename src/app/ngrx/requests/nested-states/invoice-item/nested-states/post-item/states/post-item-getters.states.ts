import { createSelector } from '@ngrx/store';
import { IItemRequestState } from '../../../states/invoice-item.state';
import { getItemRequestState } from '../../../states/invoice-item-getters';
import { IItemPost } from './post-item.states';

export const  getItemPostRequestState = createSelector(
  getItemRequestState,
  (state: IItemRequestState) => state.itemPostState
);

export const getItemPostloaded = createSelector(
  getItemPostRequestState,
  (state: IItemPost) => state.loaded
);

export const getItemPostData = createSelector(
  getItemPostRequestState,
  (state: IItemPost) => state.data
);