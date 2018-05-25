import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state/app-state';
import { IInvoiceState } from './invoices.state';

export const getInvoicesState = (state: AppState) => state.invoices;

export const getCollectionEntitiesInvoice = createSelector(
  getInvoicesState,
  (state: IInvoiceState) => state.entities
);

export const getCollectionIdsInvoice = createSelector(
  getInvoicesState,
  (state: IInvoiceState) => state.collectionIds
);

export const getCollectionsInvoices = createSelector(
  getCollectionEntitiesInvoice,
  getCollectionIdsInvoice,
  (entities, ids) => {
    return ids.filter(id => entities[id]).map(id => entities[id]);
  }
);