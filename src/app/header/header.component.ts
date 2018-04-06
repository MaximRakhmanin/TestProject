import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../core/services/invoice.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  countInvoice$;
  constructor(private is: InvoiceService) { }

  ngOnInit() {
    this.is.getInvoices();
    this.countInvoice$ = this.is.invoices$.map(invoice => invoice.length);
  }

}
