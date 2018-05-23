export interface IItemPut {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const itemPutInitialState: IItemPut = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};