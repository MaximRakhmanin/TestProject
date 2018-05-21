import { productGetReducer } from '../nested-states/products/reducers';
import { IRequestState, requestsInitialState } from '../states';
import { customersGetReducer } from '../nested-states/customers/reducers';


export function requestReducer(
  state = requestsInitialState,
  action
): IRequestState {
  return{
    productsGetState: productGetReducer(state.productsGetState, action),
    customersGetState: customersGetReducer(state.customersGetState, action),
  };
  }
