import { Action } from '@ngrx/store';

export const ITEM_GET_LIST = 'Item-Get-List';

export const actionTypes = {
  REQUEST: `[${ITEM_GET_LIST}] Request`,
  REQUEST_SUCCESS: `[${ITEM_GET_LIST}] Request Success`,
  REQUEST_FAIL: `[${ITEM_GET_LIST}] Request Fail`
};

export class ItemGetListAction implements Action {
  type = actionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class ItemGetListSuccessAction implements Action {
  type = actionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class ItemGetListFailAction implements Action {
  type = actionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type ItemGetListActions =
  ItemGetListAction |
  ItemGetListSuccessAction |
  ItemGetListFailAction;