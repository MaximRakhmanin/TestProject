import { Action } from '@ngrx/store';

export const DELETE_ITEM = 'Delete-Item';

export const ActionTypes = {
  REQUEST: `[${DELETE_ITEM}] Request`,
  REQUEST_SUCCESS: `[${DELETE_ITEM}] Request Success`,
  REQUEST_FAIL: `[${DELETE_ITEM}] Request Fail`
};

export class DeleteItemAction implements Action {
  type = ActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class DeleteItemSuccessAction implements Action {
  type = ActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class DeleteItemFailAction implements Action {
  type = ActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type Actions =
  DeleteItemAction |
  DeleteItemSuccessAction |
  DeleteItemFailAction;