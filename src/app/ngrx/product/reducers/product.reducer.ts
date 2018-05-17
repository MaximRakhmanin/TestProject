import * as ProductActions from '../actions/product.actions';
import { initialState, IProductsState } from '../states/product.states';

export function productReducer(
  state = initialState,
  action: ProductActions.Actions): IProductsState {
  switch (action.type) {
    case ProductActions.Get_List_Success_full: {
      return {
        ...state,
        entities: action.payload.reduce((entities, currProduct) => {
          return { ...entities, [currProduct.id]: currProduct };
        }, {}),
        collectionIds: action.payload.map(product => product.id)
      };
}
    default: {
      return state;
    }
  }
}
