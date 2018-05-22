import { Action } from '@ngrx/store';
import { InvoiceItem } from '../../../models/invoice-item';

export const INVOICE_ITEM = 'Invoice_item';

export const Get_List = `[${INVOICE_ITEM}] Get_list`;
export const Get_List_Success_full = `[${INVOICE_ITEM}] Get_List_Success_full`;

export class GetListItem implements Action {

  readonly type = Get_List;

  constructor(public payload?: any) {}
}

export class GetListSuccessFullItem implements Action {

  readonly type = Get_List_Success_full;

  constructor(public payload: InvoiceItem[]) {}
}
export type itemActions = GetListItem | GetListSuccessFullItem;