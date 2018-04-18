import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { ProductService } from '../../core/services/product.service';

@Injectable()
export class EditInvoiceResolverService implements Resolve<void> {

  constructor(
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService,
    private productService: ProductService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    this.customerService.getCustomers();
    const id = route.paramMap.get('id');
    this.productService.getProducts();
    this.invoiceItemService.getItem(id);
  }
}
