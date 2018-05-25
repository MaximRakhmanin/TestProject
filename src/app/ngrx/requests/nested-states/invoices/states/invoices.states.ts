import { IInvoiceGetList } from '../nested-states/get-list-invoices/states';
import { IInvoiceDelete } from '../nested-states/delete-invoice/states';
import { IInvoicePost } from '../nested-states/post-invoice/states';
import { IInvoicePut } from '../nested-states/put-invoice/states';
import { IInvoiceGet } from '../nested-states/get-invoice/states/get-invoice-state';


export interface IInvoiceRequestState {
  invoiceGetListState?: IInvoiceGetList;
  invoiceDeleteState?: IInvoiceDelete;
  invoicePostState?: IInvoicePost;
  invoicePutState?: IInvoicePut;
  invoiceGetState?: IInvoiceGet;
}

export const initialInvoiceState: IInvoiceRequestState = {};