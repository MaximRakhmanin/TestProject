import * as ProductActions from '../actions';
import { initialState, IProductsState } from '../states/product.states';

export function productReducer(
  state = initialState,
  {type, payload}: ProductActions.Actions): IProductsState {
  switch (type) {
    case ProductActions.Get_List_Success_full: {

      const entities = payload.reduce((accEntities, currProduct) =>
          ({...accEntities, [currProduct.id]: currProduct }), {});
      const collectionIds = payload.map(product => product.id);

      return {
        ...state,
        entities,
        collectionIds,
        isLoadProduct: true
      };
}
    default: {
      return state;
    }
  }
}
