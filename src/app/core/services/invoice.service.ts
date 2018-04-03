import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from './customer.service';
import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

@Injectable()
export class InvoiceService {

  constructor(private http: HttpClient, private customerService: CustomerService) { }
  getInvoice() {
      const inv = Observable.
      combineLatest(this.http.get('http://api.invoice-app.2muchcoffee.com/api/invoices'),
          this.customerService.getCustomer());
      return inv;
  }
}
