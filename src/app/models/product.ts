import { InvoiceItem } from './invoice-item';

export class Product {
    id: number;
    name: string;
    price: number;
    item?: InvoiceItem;
}
