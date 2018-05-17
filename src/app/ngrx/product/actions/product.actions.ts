import { Action } from '@ngrx/store';
import { Product } from '../../../models/product';


export const Get_List = '[Product] Get_list';
export const Get_List_Success_full = '[Product] Get_List_Success_full';

export class GetListProduct implements Action {

  readonly type = Get_List;
}

export class GetListSuccessFullProduct implements Action {

  readonly type = Get_List_Success_full;

  constructor(public payload: Product[]) {}
}
export type Actions = GetListProduct | GetListSuccessFullProduct;