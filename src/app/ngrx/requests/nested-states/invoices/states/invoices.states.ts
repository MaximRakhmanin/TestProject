import { IInvoiceGetList } from '../nested-states/get-list-invoices/states';


export interface IInvoiceRequestState {
  invoiceGetListState?: IInvoiceGetList;
}

export const initialInvoiceState: IInvoiceRequestState = {};