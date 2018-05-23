import { IItemGetList } from '../nested-states/get-list-items/states';
import { IItemPost } from '../nested-states/post-item/states';
import { IItemPut } from '../nested-states/put-item/states';

export interface IItemRequestState {
  itemGetListState?: IItemGetList;
  itemPostState?: IItemPost;
  itemPutState?: IItemPut;
}

export const initialItemState: IItemRequestState = {};