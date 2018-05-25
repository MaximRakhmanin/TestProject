import { ItemPutActionTypes } from '../../../../invoice-item/nested-states/post-item/actions';
import { IInvoicePut, invoicePutInitialState } from '../states';
import { InvoicePutActions } from '../actions/put-invoice.actions';

export function InvoicePutReducer(
  state: IInvoicePut = invoicePutInitialState,
  {type, payload}: InvoicePutActions
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