import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../models/customer';

import { CustomerService } from '../core/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers$: Observable<Customer[]>;

  displayedColumns = ['name', 'address', 'phone'];

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customers$ = this.customerService.customers$;
  }
}
