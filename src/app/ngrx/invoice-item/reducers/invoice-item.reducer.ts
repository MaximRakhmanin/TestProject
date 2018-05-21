import { IItemState, initialState } from '../states';
import * as itemActions from '../actions';

export function invoiceItemReducer(
  state = initialState,
  {type, payload}: IItemState
) {
  switch (type) {
    case itemActions.Get_List_Success_full: {

      const entities = payload.reduce((accEntities, currItem) =>
        ({...accEntities, [currItem.id]: currItem }), {});
      const collectionIds = payload.map(item => item.id);

      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    default: {
      return state;
    }
  }
}