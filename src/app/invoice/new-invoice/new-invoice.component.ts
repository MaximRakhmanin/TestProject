import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';
import { ModalService } from '../../core/services/modal.service';
import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { ModalComponent } from '../../modal/modal.component';
import 'rxjs/add/observable/of';


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
  productPrice = [];
  total = 0;
  success = false;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private dialog: MatDialog,
    private modalService: ModalService
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
  }
  validate() {
    this.invoiceForm = new FormGroup({
      customer: new FormControl('', [Validators.required]),
      product: new FormArray([]),
      discount: new FormControl('', [Validators.max(50)]),
      addproduct: new FormControl('')
    });
  }
  addProduct(product) {
    const arr = <FormArray>this.product;
    arr.push(new FormGroup({
      product_id: new FormControl(product.id, [Validators.required]),
      quantity: new FormControl(1),
    }));
    //this.productPrice.push(product.price);
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
     this.success = true;
     setTimeout(() => this.success = false, 4000);
    }
  }
  getPrice(id) {
    const items$ = Observable.of(this.product.value);
    Observable.combineLatest(
      items$,
      this.products$)
    .map(([items, products]: [any, Product[]]) => {
      return items.map(item => {
        const prod = products.find(product => product.id === item.product_id);
        prod.quantity = item.quantity;
        return prod;
      });
    }).map(products => {
     return products.map(product => {
       product.invoicePrice = product.price * product.quantity;
       return product;
     });
    }).subscribe(res => this.getTotal(res));
    //let total = 0;
    //this.productPrice[index] = price;
    //this.productPrice.forEach(p => {
    //  total += p;
    //});
    //this.total = +total.toFixed(2);
    //this.discount.valueChanges.subscribe(res => {
    //  this.total = +(total * (1 - res / 100)).toFixed(2);
    //});
  }
  getTotal(products) {
    this.total = 0;
    products.forEach(product => {
      this.total += +(product.price * product.quantity) * (1 - this.discount.value / 100);
    });
  }
  delete(index) {
    console.log(this.product.at(index).value.price);
    const arr = <FormArray>this.invoiceForm.controls['product'];
    arr.removeAt(index);
  }
  openDialog() {
      this.dialog.open(ModalComponent, {
        width: '300px',
        data: {
          title: 'Warning',
          content: 'Are you sure you want to exit without saving?'
        }
      });
  }

  canDeactivate() {
    if (this.invoiceForm.touched) {
     this.openDialog();
     return this.modalService.status$;
    }
    return true;
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
