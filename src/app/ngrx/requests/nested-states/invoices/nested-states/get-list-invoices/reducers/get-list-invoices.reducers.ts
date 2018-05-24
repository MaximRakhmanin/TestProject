import { IInvoiceGetList, invoiceGetInitialState } from '../states';
import { actionTypes, InvoiceGetListActions } from '../actions';

export function InvoiceGetListReducer(
  state: IInvoiceGetList = invoiceGetInitialState,
  {type, payload}: InvoiceGetListActions
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