import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomerResolverService implements Resolve<Customer[]> {

  constructor(private customerService: CustomerService) { }
  resolve(): Observable<Customer[]> {
   return this.customerService.getCustomers();
  }
}
