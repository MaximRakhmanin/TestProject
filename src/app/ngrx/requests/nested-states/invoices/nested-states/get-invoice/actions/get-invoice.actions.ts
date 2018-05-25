import { Action } from '@ngrx/store';

export const GET_INVOICE = 'Get-Invoice';

export const GetInvoiceActionTypes = {
  REQUEST: `[${GET_INVOICE}] Request`,
  REQUEST_SUCCESS: `[${GET_INVOICE}] Request Success`,
  REQUEST_FAIL: `[${GET_INVOICE}] Request Fail`
};

export class GetInvoiceAction implements Action {
  type = GetInvoiceActionTypes.REQUEST;
  
  constructor(public payload?: any) {
  }
}
export class GetInvoiceSuccessAction implements Action {
  type = GetInvoiceActionTypes.REQUEST_SUCCESS;
  
  constructor(public payload: any) {
  }
}
export class GetInvoiceFailAction implements Action {
  type = GetInvoiceActionTypes.REQUEST_FAIL;
  
  constructor(public payload: any) {
  }
}


export type GetInvoiceActions =
  GetInvoiceAction |
  GetInvoiceSuccessAction |
  GetInvoiceFailAction;