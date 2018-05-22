export interface IItemPost {
  loading: boolean;
  loaded: boolean;
  status: string;
  data: any;
}

export const itemPostInitialState: IItemPost = {
  loading: false,
  loaded: false,
  status: '',
  data: null
};