import { createSelector } from '@ngrx/store';
import { IProductsState } from './product.states';
import { AppState } from '../../app-state/app-state';

export const getProductsState = (state: AppState) => state.products;
export const getProductsEntities = createSelector(
  getProductsState,
  (state: IProductsState) => state.entities
);

export const getCollectionIdsProducts = createSelector(
  getProductsState,
  (state: IProductsState) => state.collectionIds
);

export const getCollectionProducts = createSelector(
  getProductsEntities,
  getCollectionIdsProducts,
  (entities, ids) =>
    ids.filter(id => entities[id]).map(id => entities[id])
);