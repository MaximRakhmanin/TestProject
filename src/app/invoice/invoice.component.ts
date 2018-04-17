import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../core/services/invoice.service';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../models/invoice';
import 'rxjs/add/observable/combineLatest';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../models/customer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  displayedColumns = ['id', 'customer_name', 'discount', 'total', 'actions'];
  
  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {
  }
  
  ngOnInit() {
    this.gitInvoice();
  }
  
  gitInvoice() {
    this.invoices$ = Observable.combineLatest(this.invoiceService.invoices$, this.customerService.customers$)
    .map(([invoices, customers]: [Invoice[], Customer[]]) => {
      return invoices.map((invoice) => {
        invoice.customer = customers.find(customer => customer.id === invoice.customer_id);
        return invoice;
      });
    });
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        id: id,
        title: 'Delete',
        content: 'Are you sure you want to delete an invoice?'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.delete(res);
      }
    });
  }
  delete(id) {
    this.invoiceService.delete(id).subscribe();
    this.invoices$ = this.invoices$.map(arr => {
      return arr.filter(invoice => invoice.id !== id);
    });
  }
}


