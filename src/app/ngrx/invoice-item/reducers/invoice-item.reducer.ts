import { initialState } from '../states';
import * as itemActions from '../actions';

export function invoiceItemReducer(
  state = initialState,
  {type, payload}: itemActions.itemActions
) {
  switch (type) {
    case itemActions.Get_List_Success_full:
    case itemActions.Post_Item_Success_full:
    case itemActions.Put_Item_Success_full: {
      const entities = payload.reduce((accEntities, currItem) =>
        ({...accEntities, [currItem.id]: currItem}), {});

      const collectionIds = payload.map(item => item.id);

      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    case itemActions.Delete_Item_Success_full: {
     const entities = payload.map(item => {
       delete state.entities[item.id];
       return state.entities;
     });
     const collectionIds = state.collectionIds.filter(id => !payload.find(item => id === item.id));

      return { entities, collectionIds };

    }

    default: {
      return state;
    }
  }
  }
