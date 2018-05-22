import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state/app-state';
import { IItemState } from './invoice-item.state';

export const getInvoiceItemsState = (state: AppState) => state.invoiceItem;

export const getCollectionEntitiesInvoiceItem = createSelector(
  getInvoiceItemsState,
  (state: IItemState) => state.entities
);

export const getCollectionIdsInvoiceItem = createSelector(
  getInvoiceItemsState,
  (state: IItemState) => state.collectionIds
);

export const getCurrentId = createSelector(
  getInvoiceItemsState,
  (state: IItemState) => state.currentId
);

export const getCurrentItem = createSelector(
  getCollectionEntitiesInvoiceItem,
  getCurrentId,
  (entities, id) => entities[id]
);

export const getCollectionsInvoiceItem = createSelector(
  getCollectionEntitiesInvoiceItem,
  getCollectionIdsInvoiceItem,
  (entities, ids) =>
    ids.filter(id => entities[id]).map(id => entities[id])
);