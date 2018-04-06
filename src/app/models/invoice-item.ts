import { Product } from './product';
import { Invoice } from './invoice';

export class InvoiceItem {
  id: number;
  invoice_id: number;
  product_id: number;
  quantity: number;
  invoice?: Invoice;
  product?: Product;
}
