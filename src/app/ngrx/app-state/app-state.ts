import { Product } from '../../models/product';
import { IProductsState } from '../product/states/product.states';

export interface AppState {
  readonly products: IProductsState;
}

