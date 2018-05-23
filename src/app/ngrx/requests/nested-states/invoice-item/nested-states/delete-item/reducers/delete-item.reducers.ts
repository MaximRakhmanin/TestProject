import { IItemDelete, itemDeleteInitialState } from '../states';
import { Actions, ActionTypes } from '../actions';

export function ItemDeleteReducer(
  state: IItemDelete = itemDeleteInitialState,
  {type, payload}: Actions
) {
  switch (type) {
    case ActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case ActionTypes.REQUEST_SUCCESS:
    case ActionTypes.REQUEST_FAIL:
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