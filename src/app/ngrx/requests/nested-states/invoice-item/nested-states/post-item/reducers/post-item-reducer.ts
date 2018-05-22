
import { IItemPost, itemPostInitialState } from '../states';
import { ItemPostActions } from '../actions/post-item.actions';
import { ItemPostActionTypes } from '../actions';

export function ItemPostReducer(
  state: IItemPost = itemPostInitialState,
  {type, payload}: ItemPostActions
) {
  switch (type) {
    case ItemPostActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case ItemPostActionTypes.REQUEST_SUCCESS:
    case ItemPostActionTypes.REQUEST_FAIL:
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