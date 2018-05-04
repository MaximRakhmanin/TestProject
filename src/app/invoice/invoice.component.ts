import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/observable/combineLatest';

import {InvoiceService} from '../core/services/invoice.service';
import { CustomerService } from '../core/services/customer.service';

import { Invoice } from '../models/invoice';
import { Customer } from '../models/customer';

import { MatDialog } from '@angular/material';
import { ModalService } from '../core/services/modal.service';




@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoices$: Observable<Invoice[]>;
  displayedColumns = ['id', 'customer_name', 'discount', 'total', 'actions'];
  subscriber: Subscription;
  deleteInvoice: Subject<any> = new Subject<any>();
  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private modalService: ModalService,
  ) {}
  ngOnInit() {
    this.getInvoice();
    this.subscriber = this.deleteInvoice
    .switchMap(id => {
      return this.modalService.openModal('delete', 'Are you sure you want to delete ??')
      .filter(choice => choice)
      .mapTo(id);
  })
    .mergeMap(id => this.invoiceService.delete(id))
    .subscribe(res => console.log('deleteInvoice'));
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  getInvoice() {
    this.invoices$ = Observable.
    combineLatest(
      this.invoiceService.invoices$,
      this.customerService.customers$
    )
    .map(([invoices, customers]: [Invoice[], Customer[]]) => {
      return invoices
      .filter(invoice => invoice)
      .map((invoice) => {
        invoice.customer = customers.find(customer => customer.id === invoice.customer_id);
        return invoice;
      });
    });
  }
  delInvoice(id) {
    this.deleteInvoice.next(id);
  }
}


