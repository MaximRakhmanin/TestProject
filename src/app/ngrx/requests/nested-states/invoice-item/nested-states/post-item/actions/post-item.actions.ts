import { Action } from '@ngrx/store';

export const POST_ITEM = 'Post-Item';

export const ItemPostActionTypes = {
  REQUEST: `[${POST_ITEM}] Request`,
  REQUEST_SUCCESS: `[${POST_ITEM}] Request Success`,
  REQUEST_FAIL: `[${POST_ITEM}] Request Fail`
};

export class PostItemAction implements Action {
  type = ItemPostActionTypes.REQUEST;

  constructor(public payload?: any) {
  }
}
export class PostItemSuccessAction implements Action {
  type = ItemPostActionTypes.REQUEST_SUCCESS;

  constructor(public payload: any) {
  }
}
export class PostItemFailAction implements Action {
  type = ItemPostActionTypes.REQUEST_FAIL;

  constructor(public payload: any) {
  }
}


export type ItemPostActions =
  PostItemAction |
  PostItemSuccessAction |
  PostItemFailAction;