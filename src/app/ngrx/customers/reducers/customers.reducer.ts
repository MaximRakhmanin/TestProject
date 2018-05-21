import * as customerActions from '../actions';
import { customerInitialState } from '../states';

export function customersReducer(
  state = customerInitialState,
  {type, payload}: customerActions.CustomersActions){
  switch (type) {
    case customerActions.Get_List_Success_full: {
      const entities = payload.reduce((accEntities, currCustomer) =>
        ({...accEntities, [currCustomer.id]: currCustomer }), {});
      const collectionIds = payload.map(customer => customer.id);
      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    default: {
      return state;
    }
  }
}