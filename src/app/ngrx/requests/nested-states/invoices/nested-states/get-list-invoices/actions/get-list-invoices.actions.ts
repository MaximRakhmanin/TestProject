import { Action } from '@ngrx/store';

export const INVOICE_GET_LIST = 'Invoice-Get-List';

export const actionTypes = {
  REQUEST: `[${INVOICE_GET_LIST}] Request`,
  REQUEST_SUCCESS: `[${INVOICE_GET_LIST}] Request Success`,
  REQUEST_FAIL: `[${INVOICE_GET_LIST}] Request Fail`
};

export class InvoiceGetListAction implements Action {
  type = actionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class InvoiceGetListSuccessAction implements Action {
  type = actionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class InvoiceGetListFailAction implements Action {
  type = actionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type InvoiceGetListActions =
  InvoiceGetListAction |
  InvoiceGetListSuccessAction |
  InvoiceGetListFailAction;