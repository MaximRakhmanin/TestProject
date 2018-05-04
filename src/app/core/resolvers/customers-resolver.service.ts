import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomersResolverService implements Resolve<Customer[]> {

  constructor(private customerService: CustomerService) { }
  resolve(): Observable<Customer[]> {
    const customer = this.customerService.isData$.switchMap(isData => {
      if (isData) {
        return this.customerService.customers$;
      }
      return this.customerService.getCustomers();
    }).take(1);
    return customer;
  }
}
