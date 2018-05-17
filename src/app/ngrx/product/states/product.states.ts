export interface IProductsState {
  entities: { [id: number]: any};
  collectionIds: number[];
}

export const initialState: IProductsState = {
  entities: {},
  collectionIds: [],

};