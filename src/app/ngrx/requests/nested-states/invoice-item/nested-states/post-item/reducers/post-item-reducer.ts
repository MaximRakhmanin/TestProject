
import { IItemPost, itemPostInitialState } from '../states';
import { ItemPostActions } from '../actions/post-item.actions';
import { ItemPutActionTypes } from '../actions';

export function ItemPostReducer(
  state: IItemPost = itemPostInitialState,
  {type, payload}: ItemPostActions
) {
  switch (type) {
    case ItemPutActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case ItemPutActionTypes.REQUEST_SUCCESS:
    case ItemPutActionTypes.REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        status: 'success',
        data: payload
      };

    default: {
      return state;
    }
  }
}