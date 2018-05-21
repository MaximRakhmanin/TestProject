import { productGetReducer } from '../nested-states/products/reducers';
import { IRequestState, requestsInitialState } from '../states';


export function requestReducer(
  state = requestsInitialState,
  action
): IRequestState {
  return { productsGetState: productGetReducer(state.productsGetState, action) };
  }
