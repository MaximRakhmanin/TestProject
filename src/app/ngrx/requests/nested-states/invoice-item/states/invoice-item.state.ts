import { IItemGetList } from '../nested-states/get-list-items/states';
import { IItemPost } from '../nested-states/post-item/states';

export interface IItemRequestState {
  itemGetListState?: IItemGetList;
  itemPostState?: IItemPost;
}

export const initialItemState: IItemRequestState = {};