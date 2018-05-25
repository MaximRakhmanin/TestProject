import { IInvoiceDelete, invoiceDeleteInitialState } from '../states';
import { ActionTypes, deleteInvoiceActions } from '../actions';

export function InvoiceDeleteReducer(
  state: IInvoiceDelete = invoiceDeleteInitialState,
  {type, payload}: deleteInvoiceActions
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