import { Action } from '@ngrx/store';

export const PUT_ITEM = 'Put-Item';

export const ItemPutActionTypes = {
  REQUEST: `[${PUT_ITEM}] Request`,
  REQUEST_SUCCESS: `[${PUT_ITEM}] Request Success`,
  REQUEST_FAIL: `[${PUT_ITEM}] Request Fail`
};

export class PutItemAction implements Action {
  type = ItemPutActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class PutItemSuccessAction implements Action {
  type = ItemPutActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class PutItemFailAction implements Action {
  type = ItemPutActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type ItemPutActions =
  PutItemAction |
  PutItemSuccessAction |
  PutItemFailAction;