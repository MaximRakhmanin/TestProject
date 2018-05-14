import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

import { InvoiceService } from '../core/services/invoice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countInvoice$;

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.countInvoice$ = this.invoiceService.invoices$.map(invoice => invoice.length);
  }

}
