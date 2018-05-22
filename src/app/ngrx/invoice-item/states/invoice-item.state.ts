import { InvoiceItem } from '../../../models/invoice-item';

export interface IItemState {
  entities: { [id: string]: InvoiceItem};
  collectionIds: number[];
  currentId: number;
}

export const initialState: IItemState = {
  entities: {},
  collectionIds: [],
  currentId: null,
};