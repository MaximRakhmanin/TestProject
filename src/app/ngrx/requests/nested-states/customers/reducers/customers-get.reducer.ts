import { customersGetInitialState, ICustomersRequest } from '../states';
import * as customersActions from '../actions';
import { CustomersActionTypes } from '../actions';

export function customersGetReducer(
  state: ICustomersRequest = customersGetInitialState,
  {type, payload}: customersActions.customersGetActions
) {
  switch (type) {
    case CustomersActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case CustomersActionTypes.REQUEST_SUCCESS:
    case CustomersActionTypes.REQUEST_FAIL:
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