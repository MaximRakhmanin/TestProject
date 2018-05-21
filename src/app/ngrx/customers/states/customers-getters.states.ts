import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state/app-state';
import { ICustomersState } from './customers.states';

export const getCustomersState = (state: AppState) => state.customers;
export const getCustomersEntities = createSelector(
  getCustomersState,
  (state: ICustomersState) => state.entities
);

export const getCollectionIdsCustomers = createSelector(
  getCustomersState,
  (state: ICustomersState) => state.collectionIds
);

export const getCollectionCustomers = createSelector(
  getCustomersEntities,
  getCollectionIdsCustomers,
  (entities, ids) =>
    ids.filter(id => entities[id]).map(id => entities[id])
);