import { Customer } from './customer';

export class Invoice {
    id: number;
    customer_id: number;
    discount: number;
    total: number;
    customer?: Customer;
}
