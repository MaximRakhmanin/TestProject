import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../core/services/customer.service';
import {Customer} from '../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: Customer;
  displayedColumns = ['name', 'address', 'phone'];
  constructor(private customerServie: CustomerService) { }

  ngOnInit() {
    this.getCustomer();
  }
  getCustomer() {
    this.customerServie.getCustomer().subscribe(res => this.customers = res);
  }
}
