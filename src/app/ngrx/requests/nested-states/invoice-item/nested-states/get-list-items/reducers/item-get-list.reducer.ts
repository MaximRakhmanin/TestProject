import { IItemGetList, itemGetInitialState } from '../states';
import { actionTypes, ItemGetListAction } from '../actions';


export function ItemGetListReducer(
  state: IItemGetList = itemGetInitialState,
  {type, payload}: ItemGetListAction
) {
  switch (type) {
    case actionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case actionTypes.REQUEST_SUCCESS:
    case actionTypes.REQUEST_FAIL:
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