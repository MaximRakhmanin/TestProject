
import { IProductRequest, productGetInitialState } from '../states';
import { ProductsGetActions, productsActionTypes } from '../actions';

export function productGetReducer(
  state: IProductRequest = productGetInitialState,
  {type, payload}: ProductsGetActions
) {
  switch (type) {
    case productsActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null
      };
    }
    case productsActionTypes.REQUEST_SUCCESS:
    case productsActionTypes.REQUEST_FAIL:
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