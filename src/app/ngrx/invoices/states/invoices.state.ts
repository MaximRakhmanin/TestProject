import { Invoice } from '../../../models/invoice';

export interface IInvoiceState {
  entities: { [id: string]: Invoice};
  collectionIds: number[];
}

export const invoiceInitialState: IInvoiceState = {
  entities: {},
  collectionIds: [],
};