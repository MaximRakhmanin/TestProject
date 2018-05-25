import { Action } from '@ngrx/store';

export const POST_INVOICE = 'Post-Invoice';

export const InvoicePostActionTypes = {
  REQUEST: `[${POST_INVOICE}] Request`,
  REQUEST_SUCCESS: `[${POST_INVOICE}] Request Success`,
  REQUEST_FAIL: `[${POST_INVOICE}] Request Fail`
};

export class PostInvoiceAction implements Action {

  type = InvoicePostActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class PostInvoiceSuccessAction implements Action {
  type = InvoicePostActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class PostInvoiceFailAction implements Action {
  type = InvoicePostActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type InvoicePostActions =
  PostInvoiceAction |
  PostInvoiceSuccessAction |
  PostInvoiceFailAction;