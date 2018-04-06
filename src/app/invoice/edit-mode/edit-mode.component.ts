import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { Invoice } from '../../models/invoice';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  invoice$: Observable<Invoice>;
  selectedCustomer;
  displayedColumns = ['product', 'quantity', 'price'];
  forms: FormGroup;
  constructor(
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    this.validator();
    this.getData();
    console.log(this.selectedCustomer);
  }
  getData() {
    this.customers$ = this.customerService.customers$;
    this.invoiceItemService.customer$.subscribe(res => this.selectedCustomer = res);
    this.invoice$ = this.invoiceItemService.invoice$;
    this.products$ = Observable.combineLatest(this.invoiceItemService.products$,
      this.invoiceItemService.items$).map(([products, items]) => {
      return products.map(product => {
        product.item = items.find(item => {
          product.selectId = item.product_id;
          product.count = products.length;
         return item.product_id === product.id; });
        return product;
      });
    });
  }
  validator() {
    this.forms = this.fb.group({
      customer: this.selectedCustomer,
      product: 'Phone Holder',
      text: ''
    });
  }
}
