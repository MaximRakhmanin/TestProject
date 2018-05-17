import { Action } from '@ngrx/store';
import { Product } from '../../../models/product';

export const PRODUCT = 'Product';

export const Get_List = `[${PRODUCT}] Get_list`;
export const Get_List_Success_full = `[${PRODUCT}] Get_List_Success_full`;

export class GetListProduct implements Action {

  readonly type = Get_List;

  constructor(public payload?: undefined ) {}
}

export class GetListSuccessFullProduct implements Action {

  readonly type = Get_List_Success_full;

  constructor(public payload: Product[]) {}
}
export type Actions = GetListProduct | GetListSuccessFullProduct;