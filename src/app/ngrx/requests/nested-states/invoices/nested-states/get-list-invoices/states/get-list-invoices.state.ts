export interface IInvoiceGetList {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceGetInitialState: IInvoiceGetList = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};