import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCustomer() {
    return this.http.get('http://api.invoice-app.2muchcoffee.com/api/customers');
  }
}
