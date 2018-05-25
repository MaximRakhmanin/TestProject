export interface IInvoicePost {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoicePostInitialState: IInvoicePost = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};