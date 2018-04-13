import { Injectable } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Resolve } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Injectable()
export class NewInvoiceResolverService implements Resolve<void> {

  constructor(
    private customerService: CustomerService,
    private productService: ProductService
  ) { }
  resolve() {
    this.customerService.getCustomers();
    this.productService.getProducts();
    
  }
}
