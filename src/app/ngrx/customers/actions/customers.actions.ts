import { Action } from '@ngrx/store';
import { Customer } from '../../../models/customer';

export const CUSTOMER = 'Customer';

export const Get_List = `[${CUSTOMER}] Get_list`;
export const Get_List_Success_full = `[${CUSTOMER}] Get_List_Success_full`;

export class GetListCustomers implements Action {

  readonly type = Get_List;

  constructor(public payload?: undefined ) {}
}

export class GetListSuccessFullCustomers implements Action {

  readonly type = Get_List_Success_full;

  constructor(public payload: Customer[]) {}
}
export type CustomersActions = GetListCustomers | GetListSuccessFullCustomers;