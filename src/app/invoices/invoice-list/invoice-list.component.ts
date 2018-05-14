import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../../core/services/modal.service';
import { CustomerService } from '../../core/services/customer.service';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../core/services/invoice.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  invoices$: Observable<Invoice[]>;
  displayedColumns = ['id', 'customer_name', 'discount', 'total', 'actions'];
  subscriber: Subscription;
  deleteInvoice: Subject<number> = new Subject<number>();
  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private modalService: ModalService,
  ) {}
  ngOnInit() {
    this.invoices$ = this.invoiceService.invoices$;
    this.subscriber = this.deleteInvoice
    .switchMap(id => {
      return this.modalService.openModal('delete', 'Are you sure you want to delete ??')
      .filter(choice => choice)
      .mapTo(id);
    })
    .mergeMap(id => this.invoiceService.delete(id))
    .subscribe(() => console.log('deleteInvoice'));
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  remove(id) {
    this.deleteInvoice.next(id);
  }

}
