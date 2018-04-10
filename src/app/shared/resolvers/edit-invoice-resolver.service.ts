import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';

@Injectable()
export class EditInvoiceResolverService implements Resolve<void> {

  constructor(
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    this.customerService.getCustomers();
    const id = route.paramMap.get('id');
    this.invoiceItemService.getItem(id);
  }
}
