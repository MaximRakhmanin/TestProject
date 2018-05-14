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
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.countInvoice$ = this.invoiceService.invoices$.map(invoice => invoice.length);
  }

}
