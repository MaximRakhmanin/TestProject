
import { initialItemState } from '../states/invoice-item.state';
import { ItemGetListReducer } from '../nested-states/get-list-items/reducers';

export function itemReducer(
  state = initialItemState,
  action
) {
  return{
    itemGetListState: ItemGetListReducer(state.itemGetListState, action),
  };
}