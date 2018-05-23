import { ItemPostActionTypes } from '../../post-item/actions';
import { IItemPut, itemPutInitialState } from '../states';
import { ItemPutActions } from '../actions';

export function ItemPutReducer(
  state: IItemPut = itemPutInitialState,
  {type, payload}: ItemPutActions
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