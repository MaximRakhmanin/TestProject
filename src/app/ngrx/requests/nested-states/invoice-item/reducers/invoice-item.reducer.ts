
import { initialItemState } from '../states';
import { ItemGetListReducer } from '../nested-states/get-list-items/reducers';
import { ItemPostReducer } from '../nested-states/post-item/reducers';
import { ItemPutReducer } from '../nested-states/put-item/reducers';
import { ItemDeleteReducer } from '../nested-states/delete-item/reducers/delete-item.reducers';

export function itemReducer(
  state = initialItemState,
  action
) {
  return{
    itemGetListState: ItemGetListReducer(state.itemGetListState, action),
    itemPostState: ItemPostReducer(state.itemPostState, action),
    itemPutState: ItemPutReducer(state.itemPutState, action),
    itemDeleteState: ItemDeleteReducer(state.itemDeleteState, action),
  };
}