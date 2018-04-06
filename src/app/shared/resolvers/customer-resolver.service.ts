import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';

@Injectable()
export class CustomerResolverService implements Resolve<void> {

  constructor(private customerService: CustomerService) { }
  resolve() {
    this.customerService.getCustomers();
  }
}
