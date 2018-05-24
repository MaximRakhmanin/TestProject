import { invoiceInitialState } from '../states';
import * as invoices from '../actions';

export function invoicesReducer(
  state = invoiceInitialState,
  {type, payload}: invoices.invoiceActions
) {
  switch (type) {
    case invoices.Get_List_Success_full:
    case invoices.Post_Invoice_Success_full:
    case invoices.Put_Invoice_Success_full: {
      const entities = payload.reduce((accEntities, currItem) =>
        ({...accEntities, [currItem.id]: currItem}), {});

      const collectionIds = payload.map(item => item.id);

      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    case invoices.Delete_Invoice_Success_full: {
      const entities = payload.map(invoice => {
        delete state.entities[invoice.id];
        return state.entities;
      });
      const collectionIds = state.collectionIds.filter(id => !payload.find(invoice => id === invoice.id));

      return { entities, collectionIds };

    }

    default: {
      return state;
    }
  }
}