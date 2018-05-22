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

export const getCollectionsInvoiceItem = createSelector(
  getCollectionEntitiesInvoiceItem,
  getCollectionIdsInvoiceItem,
  (entities, ids) =>
    ids.filter(id => entities[id]).map(id => entities[id])
);