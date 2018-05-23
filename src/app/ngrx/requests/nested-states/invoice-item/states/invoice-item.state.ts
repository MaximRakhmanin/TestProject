import { IItemGetList } from '../nested-states/get-list-items/states';
import { IItemPost } from '../nested-states/post-item/states';
import { IItemPut } from '../nested-states/put-item/states';
import { IItemDelete } from '../nested-states/delete-item/states';

export interface IItemRequestState {
  itemGetListState?: IItemGetList;
  itemPostState?: IItemPost;
  itemPutState?: IItemPut;
  itemDeleteState?: IItemDelete;
}

export const initialItemState: IItemRequestState = {};