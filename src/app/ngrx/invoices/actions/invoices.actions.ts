import { Action } from '@ngrx/store';
import { Invoice } from '../../../models/invoice';

export const INVOICES = 'Invoices';

export const Get_List = `[${INVOICES}] Get_list`;
export const Get_List_Success_full = `[${INVOICES}] Get_List_Success_full`;
export const Post_Invoice = `[${INVOICES}] Post_Invoice`;
export const Post_Invoice_Success_full = `[${INVOICES}] Post_Invoice_Success_full`;
export const Put_Invoice = `[${INVOICES}] Put_Invoice`;
export const Put_Invoice_Success_full = `[${INVOICES}] Put_Invoice_Success_full`;
export const Delete_Invoice = `[${INVOICES}] Delete_Invoice`;
export const Delete_Invoice_Success_full = `[${INVOICES}] Delete_Invoice_Success_full`;
export const Get_Invoice = `[${INVOICES}] Get_Invoice`;
export const Get_Invoice_Success_Full = `[${INVOICES}] Get_Invoice_Success_Full`;

export class GetListInvoices implements Action {

  readonly type = Get_List;

  constructor(public payload?: any) {}
}

export class GetListSuccessFullInvoices implements Action {

  readonly type = Get_List_Success_full;

  constructor(public payload: Invoice[]) {}
}

export class GetInvoice implements Action {

  readonly type = Get_Invoice;

  constructor(public payload: any) {}
}

export class GetInvoiceSuccessFull implements Action {

  readonly  type = Get_Invoice_Success_Full;

  constructor(public payload: any) {}
}

export class PostInvoice implements Action {

  readonly type = Post_Invoice;

  constructor(public payload: any) {}
}

export class PostInvoiceSuccessFull implements Action {

  readonly type = Post_Invoice_Success_full;

  constructor(public payload: any) {}
}

export class PutInvoice implements Action {

  readonly type = Put_Invoice;

  constructor(public payload: any) {}
}

export class PutInvoiceSuccessFull implements Action {

  readonly type = Put_Invoice_Success_full;

  constructor(public payload: any) {}
}

export class DeleteInvoice implements Action {

  readonly type = Delete_Invoice;

  constructor(public payload: any) {}
}

export class DeleteInvoiceSuccessFull implements Action {

  readonly type = Delete_Invoice_Success_full;

  constructor(public payload: any) {}
}

export type invoiceActions =
  GetListInvoices |
  GetListSuccessFullInvoices |
  PostInvoice |
  PostInvoiceSuccessFull |
  PutInvoice |
  PutInvoiceSuccessFull |
  DeleteInvoice |
  DeleteInvoiceSuccessFull;