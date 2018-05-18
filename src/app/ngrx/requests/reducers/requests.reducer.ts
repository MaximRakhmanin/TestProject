import { requestInitialState } from '../states';
import { productGetReducer } from '../nested-states/products/reducers';

export function requestReducer(
  state = requestInitialState,
  action
) {
  return {
    productState: productGetReducer(state.productsGetState, action)
    };
  }
