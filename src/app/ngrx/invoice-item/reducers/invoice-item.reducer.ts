import { initialState } from '../states';
import * as itemActions from '../actions';

export function invoiceItemReducer(
  state = initialState,
  {type, payload}: itemActions.itemActions
) {
  debugger;
  switch (type) {
    case itemActions.Get_List_Success_full:
    case itemActions.Post_Item_Success_full: {

      const entities = payload.reduce((accEntities, currItem) =>
        ({...accEntities, [currItem.id]: currItem}), {});

      const collectionIds = payload.map(item => item.id);

      const currentId = payload[0].id;
      return {
        ...state,
        entities,
        collectionIds,
        currentId,
      };
    }

    default: {
      return state;
    }
  }
  }
