import { IInvoicePost, invoicePostInitialState } from '../states';
import { InvoicePostActions, InvoicePostActionTypes } from '../actions';

export function InvoicePostReducer(
  state: IInvoicePost = invoicePostInitialState,
  {type, payload}: InvoicePostActions
) {
  switch (type) {
    case InvoicePostActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case InvoicePostActionTypes.REQUEST_SUCCESS:
    case InvoicePostActionTypes.REQUEST_FAIL:
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