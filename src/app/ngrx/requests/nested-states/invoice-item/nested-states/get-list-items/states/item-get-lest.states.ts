export interface IItemGetList {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const itemGetInitialState: IItemGetList = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};