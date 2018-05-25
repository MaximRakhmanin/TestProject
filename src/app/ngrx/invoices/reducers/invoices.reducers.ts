import { invoiceInitialState } from '../states';
import * as invoices from '../actions';

export function invoicesReducer(
  state = invoiceInitialState,
  {type, payload}: invoices.invoiceActions
) {
  switch (type) {
    case invoices.Get_List_Success_full: {
      const entities = payload.reduce((accEntities, currItem) =>
        ({...accEntities, [currItem.id]: currItem}), {});

      const collectionIds = payload.map(item => item.id);

      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    case invoices.Post_Invoice_Success_full:
    case invoices.Put_Invoice_Success_full: {
      const entities = payload.reduce((accEntities, currItem) =>
        ({...accEntities, [currItem.id]: currItem}), state.entities);

      const currCollectionIds = payload.map(item => item.id);
      const collectionIds = [...state.collectionIds, ...currCollectionIds];

      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    case invoices.Delete_Invoice_Success_full: {
      const entities = {...state.entities};
      payload.forEach(invoice => {
        delete entities[invoice.id];
      });
      const collectionIds = state.collectionIds.filter(id => !payload.find(invoice => id === invoice.id));

      return { entities, collectionIds };

    }
    case invoices.Get_Invoice_Success_Full: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
}