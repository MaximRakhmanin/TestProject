import { IItemGetList } from '../nested-states/get-list-items/states';

export interface IItemState {
  itemGetListState?: IItemGetList;
}

export const initialItemState: IItemState = {};