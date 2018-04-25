///<reference path="../../../../node_modules/rxjs/add/operator/catch.d.ts"/>
///<reference path="../../../../node_modules/rxjs/add/observable/of.d.ts"/>
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';

import {Customer} from '../../models/customer';
import 'rxjs/add/observable/of';


@Injectable()
export class CustomerService {
  customers$: Observable<Customer[]>;
  customer$: Observable<Customer>;
  constructor(private http: HttpClient) { }
  getCustomers(): Observable<Customer[]> {
   return this.customers$ = this.http.get<Customer[]>('/customers')
   .shareReplay(1)
    .catch(err => {
    return Observable.throw(err); });
  }
  getCustomer(id): Observable<Customer> {
   return this.customer$ = this.http.get<Customer>(`/customers/${id}`)
   .shareReplay(1);
  }

}
