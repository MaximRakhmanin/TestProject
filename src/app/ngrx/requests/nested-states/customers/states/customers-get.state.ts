export interface ICustomersRequest {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const customersGetInitialState: ICustomersRequest = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};