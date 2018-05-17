import { Product } from '../../../models/product';

export interface IProductsState {
  entities: { [id: string]: Product};
  collectionIds: number[];
  isLoadProduct: boolean;
}

export const initialState: IProductsState = {
  entities: {},
  collectionIds: [],
  isLoadProduct: false,

};