
import { initialItemState } from '../states';
import { ItemGetListReducer } from '../nested-states/get-list-items/reducers';
import { ItemPostReducer } from '../nested-states/post-item/reducers';

export function itemReducer(
  state = initialItemState,
  action
) {
  return{
    itemGetListState: ItemGetListReducer(state.itemGetListState, action),
    itemPostState: ItemPostReducer(state.itemPostState, action),
  };
}