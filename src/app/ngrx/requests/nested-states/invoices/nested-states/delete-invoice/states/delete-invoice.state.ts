export interface IInvoiceDelete {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoiceDeleteInitialState: IInvoiceDelete = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};