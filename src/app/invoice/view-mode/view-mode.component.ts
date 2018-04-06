import { Component, OnInit } from '@angular/core';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { Observable } from 'rxjs/Observable';
import { InvoiceItem } from '../../models/invoice-item';
import { Product } from '../../models/product';
import { Customer } from '../../models/customer';
import { Invoice } from '../../models/invoice';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss']
})
export class ViewModeComponent implements OnInit {
  products$: Observable<Product[]>;
  customer$: Observable<Customer>;
  invoice$: Observable<Invoice>;
  displayedColumns = ['product', 'quantity', 'price'];
  constructor(private invoiceItemService: InvoiceItemService) {
  }
  ngOnInit() {
    this.getListItems();
  }
  getListItems() {
    this.customer$ = this.invoiceItemService.customer$;
    this.invoice$ = this.invoiceItemService.invoice$;
    this.products$ = Observable.combineLatest(this.invoiceItemService.products$,
      this.invoiceItemService.items$).map(([products, items]) => {
      return products.map(product => {
        product.item = items.find(item => item.product_id === product.id);
        return product;
      });
    });
  }
}
