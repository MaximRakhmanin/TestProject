import { IInvoiceGet, invoiceGetInitialState } from '../states/get-invoice-state';
import { GetInvoiceActionTypes, GetInvoiceActions } from '../actions';


export function InvoiceGetReducer(
  state: IInvoiceGet = invoiceGetInitialState,
  {type, payload}: GetInvoiceActions
) {
  switch (type) {
    case GetInvoiceActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case GetInvoiceActionTypes.REQUEST_SUCCESS:
    case GetInvoiceActionTypes.REQUEST_FAIL:
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