import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../core/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.gitInvoice();
  }
  gitInvoice() {
    this.invoiceService.getInvoice().subscribe(res => console.log(res));
  }
}
