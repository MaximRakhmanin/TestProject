import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Invoice } from '../../models/invoice';
import { ModalComponent } from '../../modal/modal.component';


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

  ngOnInit() {
    this.validate();
    this.getProduct();
    this.getData();
  }
  getData() {
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;
  }
  setInvoice() {
    if (this.invoiceForm.valid) {
      const invoice = {
        items: [],
        customer_id: this.invoiceForm.value.customer,
        discount: this.invoiceForm.value.discount || 0,
        total: this.total
      };
     this.invoiceService.setInvoice(invoice)
      .switchMap((inv: Invoice): any => {
        return this.addItem(inv.id).subscribe();
      });
     this.success = true;
     setTimeout(() => this.success = false, 4000);
    }
  }
  addItem(id) {
    const arr = this.invoiceForm.value.product.map(product => {
        const item = {
          invoice_id: id,
          product_id: product.productId,
          quantity: product.quantity
        };
        this.invoiceItemService.setItem(id, item).subscribe();
    });
    return Observable.zip([...arr]);
  }
  validate() {
    this.invoiceForm = this.fb.group({
      customer: ['', Validators.required],
      product: this.fb.array([
        this.fb.group({
          productId: ['', Validators.required],
          quantity: [0, [Validators.required, Validators.min(1)]],
          price: 0
        })
      ]),
      discount: ['', Validators.max(50)]
    });
  }
  getProduct() {
    this.product.controls.forEach(control => {
     this.product$ = Observable.combineLatest(this.productService.products$, control.valueChanges)
      .map(([products, invoiceItem]) => {
       const product = products.find(prod => {
          return prod.id === invoiceItem.productId;
        });
       if (product) {
         product.subtotal = +(product.price * control.value.quantity).toFixed(2) || 0;
         control.value.price = product.subtotal || 0;
         return product;
       }
      });
    });
    this.subscriber = this.product$.subscribe();
  }
  addProduct() {
    const arr = <FormArray>this.invoiceForm.controls['product'];
    arr.push(this.fb.group({
      productId: null,
      quantity: [0, [Validators.required]],
      price: 0
    }));
    this.getProduct();
  }
  delete(index) {
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
  get product(): FormArray {
    return this.invoiceForm.get('product') as FormArray;
  }
  get total() {
    let total = 0;
    this.product.controls.forEach(control => {
      total += +(control.value.price * (1 - this.invoiceForm.get('discount').value / 100));
    });
    return +total.toFixed(2) || 0;
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
