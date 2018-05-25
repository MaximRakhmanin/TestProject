import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';

import { ModalService } from '../../core/services/modal.service';
import { CustomerService } from '../../core/services/customer.service';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  invoices$: Observable<Invoice[]>;

  displayedColumns = ['id', 'customer_name', 'discount', 'total', 'actions'];

  deleteInvoice: Subject<number> = new Subject<number>();

  private deleteInvoiceSubscription: Subscription;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.invoices$ = this.invoiceService.invoices$;
    this.deleteInvoiceSubscription = this.deleteInvoice
    .switchMap(invoice => {
      return this.modalService.openModal('delete', 'Are you sure you want to delete ??')
      .filter(choice => choice)
      .mapTo(invoice);
    })
    .mergeMap(invoice => this.invoiceService.deleteInvoice(invoice))
    .subscribe(() => console.log('deleteInvoice'));
  }
  ngOnDestroy() {
    this.deleteInvoiceSubscription.unsubscribe();
  }

  remove(invoice) {
    this.deleteInvoice.next(invoice);
  }

}
