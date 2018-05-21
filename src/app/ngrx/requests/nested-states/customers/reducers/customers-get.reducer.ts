import { customersGetInitialState, ICustomersRequest } from '../states';
import * as customersActions from '../actions';
import { actionTypes } from '../actions';

export function customersGetReducer(
  state: ICustomersRequest = customersGetInitialState,
  {type, payload}: customersActions.customersGetActions
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