export interface IInvoiceGet {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceGetInitialState: IInvoiceGet = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};