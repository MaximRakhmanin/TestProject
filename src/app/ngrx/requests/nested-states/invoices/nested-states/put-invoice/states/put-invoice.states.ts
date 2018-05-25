export interface IInvoicePut {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const invoicePutInitialState: IInvoicePut = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};