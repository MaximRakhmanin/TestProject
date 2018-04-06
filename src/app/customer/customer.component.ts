import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../core/services/customer.service';
import {Customer} from '../models/customer';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers$: Observable<Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomer();
  }
  getCustomer() {
    this.customers$ = this.customerService.customers$;
  }
}
