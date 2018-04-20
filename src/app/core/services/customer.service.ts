import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../../models/customer';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class CustomerService {
  customers$: Observable<Customer[]>;
  constructor(private http: HttpClient) { }
  getCustomers(): Observable<Customer[]> {
   return this.customers$ = this.http.get<Customer[]>('/customers').shareReplay();
  }
  getCustomer(id): Observable<Customer> {
   return this.http.get<Customer>(`/customers/${id}`);
  }
}
