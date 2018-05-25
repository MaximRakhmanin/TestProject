import { Action } from '@ngrx/store';

export const DELETE_INVOICE = 'Delete-Invoice';

export const ActionTypes = {
  REQUEST: `[${DELETE_INVOICE}] Request`,
  REQUEST_SUCCESS: `[${DELETE_INVOICE}] Request Success`,
  REQUEST_FAIL: `[${DELETE_INVOICE}] Request Fail`
};

export class DeleteInvoiceAction implements Action {
  type = ActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class DeleteInvoiceSuccessAction implements Action {
  type = ActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class DeleteInvoiceFailAction implements Action {
  type = ActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type deleteInvoiceActions =
  DeleteInvoiceAction |
  DeleteInvoiceSuccessAction |
  DeleteInvoiceFailAction;