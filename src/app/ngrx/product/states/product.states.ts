import { Product } from '../../../models/product';

export interface IProductsState {
  entities: { [id: string]: Product};
  collectionIds: number[];
}

export const initialState: IProductsState = {
  entities: {},
  collectionIds: [],
};