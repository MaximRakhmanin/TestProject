import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../core/services/invoice.service';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../models/invoice';
import 'rxjs/add/observable/combineLatest';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../models/customer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  displayedColumns = ['id', 'customer_name', 'discount', 'total', 'actions'];
  constructor(private invoiceService: InvoiceService, private customerService: CustomerService) { }
  ngOnInit() {
    this.gitInvoice();
  }
  gitInvoice() {
    this.invoices$ = Observable.combineLatest(this.invoiceService.invoices$,this.customerService.customers$)
    .map(([invoices, customers]: [Invoice[], Customer[]]) => {
      return invoices.map((invoice) => {
        invoice.customer = customers.find(customer => customer.id === invoice.customer_id);
        return invoice;
      });
    });
  }

}
