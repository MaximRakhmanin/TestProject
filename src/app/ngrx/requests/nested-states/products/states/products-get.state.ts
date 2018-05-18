

export interface IProductRequest {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const productGetInitialState: IProductRequest = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};