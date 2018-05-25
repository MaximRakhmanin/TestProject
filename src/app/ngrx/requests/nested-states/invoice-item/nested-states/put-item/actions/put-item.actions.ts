import { Action } from '@ngrx/store';

export const PUT_ITEM = 'Put-Item';

export const ItemsPutActionTypes = {
  REQUEST: `[${PUT_ITEM}] Request`,
  REQUEST_SUCCESS: `[${PUT_ITEM}] Request Success`,
  REQUEST_FAIL: `[${PUT_ITEM}] Request Fail`
};

export class PutItemAction implements Action {
  type = ItemsPutActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class PutItemSuccessAction implements Action {
  type = ItemsPutActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class PutItemFailAction implements Action {
  type = ItemsPutActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type ItemPutActions =
  PutItemAction |
  PutItemSuccessAction |
  PutItemFailAction;