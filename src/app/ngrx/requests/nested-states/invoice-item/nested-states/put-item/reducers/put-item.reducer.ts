import { ItemPutActionTypes } from '../../post-item/actions';
import { IItemPut, itemPutInitialState } from '../states';
import { ItemPutActions } from '../actions';

export function ItemPutReducer(
  state: IItemPut = itemPutInitialState,
  {type, payload}: ItemPutActions
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