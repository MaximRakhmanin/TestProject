import { productGetReducer } from '../nested-states/products/reducers';


export function requestReducer(
  state,
  action
) {
  return { getProduct: productGetReducer(state.productsGetState, action) };
  }
