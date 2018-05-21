import { Customer } from '../../../models/customer';


export interface ICustomersState {
  entities: { [id: string]: Customer};
  collectionIds: number[];
}

export const customerInitialState: ICustomersState = {
  entities: {},
  collectionIds: [],
};