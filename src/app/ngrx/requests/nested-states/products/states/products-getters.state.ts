
import { createSelector } from '@ngrx/store';
import { IProductRequest } from './products-get.state';
import { AppState } from '../../../../app-state/app-state';


export const getRequestProduct = (state: AppState) => state.request;

export const getProductRequestLoaded = createSelector(
  getRequestProduct,
  (state: IProductRequest) => state.loaded
);