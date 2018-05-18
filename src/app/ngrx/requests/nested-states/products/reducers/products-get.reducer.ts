
import { IProductRequest, productGetInitialState } from '../states';
import { Actions, actionTypes } from '../actions';

export function productGetReducer(
  state: IProductRequest = productGetInitialState,
  {type, payload}: Actions
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