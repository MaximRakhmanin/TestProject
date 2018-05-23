export interface IItemDelete {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const itemDeleteInitialState: IItemDelete = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};