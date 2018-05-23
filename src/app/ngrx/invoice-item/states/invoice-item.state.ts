import { InvoiceItem } from '../../../models/invoice-item';

export interface IItemState {
  entities: { [id: string]: InvoiceItem};
  collectionIds: number[];
}

export const initialState: IItemState = {
  entities: {},
  collectionIds: [],
};