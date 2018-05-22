import { IItemGetList } from '../nested-states/get-list-items/states';

export interface IItemRequestState {
  itemGetListState?: IItemGetList;
}

export const initialItemState: IItemRequestState = {};