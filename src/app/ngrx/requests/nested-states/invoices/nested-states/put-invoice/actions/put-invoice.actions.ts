import { Action } from '@ngrx/store';

export const PUT_INVOICE = 'Put-Invoice';

export const InvoicePutActionTypes = {
  REQUEST: `[${PUT_INVOICE}] Request`,
  REQUEST_SUCCESS: `[${PUT_INVOICE}] Request Success`,
  REQUEST_FAIL: `[${PUT_INVOICE}] Request Fail`
};

export class PutInvoiceAction implements Action {
  type = InvoicePutActionTypes.REQUEST;

  constructor(public payload: any) {
  }
}
export class PutInvoiceSuccessAction implements Action {
  type = InvoicePutActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class PutInvoiceFailAction implements Action {
  type = InvoicePutActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type InvoicePutActions =
  PutInvoiceAction |
  PutInvoiceSuccessAction |
  PutInvoiceFailAction;