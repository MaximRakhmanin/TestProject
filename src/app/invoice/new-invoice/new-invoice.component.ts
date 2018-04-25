import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';

import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { ModalService } from '../../core/services/modal.service';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { InvoiceService } from '../../core/services/invoice.service';




@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit, OnDestroy {
  invoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  product$: Observable<Product>;
  subscriber: Subscription;
  totalSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private router: Router,
    ) { }
  get prod() {
    return this.invoiceForm.get('addproduct');
  }
  get product(): FormArray {
    return this.invoiceForm.get('product') as FormArray;
  }
  get discount() {
    return this.invoiceForm.get('discount');
  }
  get customer() {
    return this.invoiceForm.get('customer');
  }
  get total() {
    return this.invoiceForm.get('total');
  }
  ngOnInit() {
    this.validate();
    this.getData();
    this.product$ = Observable.combineLatest(
      this.products$,
      this.prod.valueChanges
    )
    .map(([products, productId]: [Product[], number]) => {
      return products.find(product => product.id === productId);
    });
    this.subscriber = this.product$.subscribe(res => this.addProduct(res));
    this.totalSubscription = Observable.combineLatest(
      //this.discount.valueChanges,
      this.product.valueChanges,
      this.products$)
    .map(([items, products]: [any, Product[]]) => {
      return items.map(item => {
        item.product = products.find(product => product.id === item.product_id);
        return item;
      });
    }).subscribe(res => this.getTotal(res));
  }
  validate() {
    this.invoiceForm = new FormGroup({
      customer: new FormControl('', [Validators.required]),
      product: new FormArray([]),
      discount: new FormControl('', [Validators.max(50)]),
      total: new FormControl(),
      addproduct: new FormControl('',[Validators.required])
    });
  }
  addProduct(product) {
    const arr = <FormArray>this.product;
    arr.push(new FormGroup({
      product_id: new FormControl(product.id, [Validators.required]),
      quantity: new FormControl(1),
    }));
  }
  getData() {
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;
  }
  setInvoice() {
    if (this.invoiceForm.valid) {
      const invoice = {
        items: this.invoiceForm.value.product,
        customer_id: this.invoiceForm.value.customer,
        discount: this.invoiceForm.value.discount || 0,
        total: this.total
      };
     this.invoiceService.setInvoice(invoice)
      .subscribe(res => console.log(res));
     this.router.navigate(['/invoice']);
    }
  }
  getTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += +(item.product.price * item.quantity) * (1 - this.discount.value / 100);
    });
    this.total.setValue(total);
  }
  delete(index) {
    const arr = <FormArray>this.invoiceForm.controls['product'];
    arr.removeAt(index);
  }

  canDeactivate() {
    if (this.invoiceForm.touched) {
    return this.modalService.openModal('confirm', 'Are you sure you want to go out ??');
    }
    return true;
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
