import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../../models/customer';

@Injectable()
export class CustomerService {
  customers$: Observable<Customer[]>;
  constructor(private http: HttpClient) { }
  getCustomers() {
    this.customers$ = this.http.get<Customer[]>('/customers');
  }
  getCustomer(id): Observable<Customer> {
   return this.http.get<Customer>(`/customers/${id}`);
  }
}
