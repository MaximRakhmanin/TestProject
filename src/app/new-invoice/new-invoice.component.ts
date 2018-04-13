import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../core/services/customer.service';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../models/customer';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';
import { InvoiceService } from '../core/services/invoice.service';
import 'rxjs/add/operator/take';
import { InvoiceItemService } from '../core/services/invoice-item.service';
import { Invoice } from '../models/invoice';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit, OnDestroy {
  invoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products: Product[];
  selectedProduct: Product;
  subscriber: Subscription;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService
    ) { }

  ngOnInit() {
    this.validate();
    this.getProduct();
    this.getData();
  }
  getData() {
    this.customers$ = this.customerService.customers$;
    this.subscriber = this.productService.products$.subscribe(res => this.products = res);
  }
  setInvoice() {
    if (this.invoiceForm.valid) {
      const invoice = {
        items: [],
        customer_id: this.invoiceForm.value.customer,
        discount: this.invoiceForm.value.discount || 0,
        total: this.total
      };
      this.subscriber = this.invoiceService.setInvoice(invoice).subscribe((res: Invoice) => {
          if (res) {
            this.addItem(res.id);
          }
        },
        error => console.log(error.error));
    }
  }
  validate() {
    this.invoiceForm = this.fb.group({
      customer: ['', Validators.required],
      product: this.fb.array([
        this.fb.group({
          productId: null,
          quantity: [0, [Validators.required]],
          price: 0
        })
      ]),
      discount: ['', Validators.max(50)]
    });
  }
  getProduct() {
    this.product.controls.forEach((control, i) => {
      control.valueChanges.subscribe(res => {
        this.selectedProduct = this.products.find(product => product.id === res.productId);
        control.value.price = +(this.selectedProduct.price * control.value.quantity).toFixed(2);
      });
    });
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
  addItem(id) {
    this.invoiceForm.value.product.forEach(product => {
      const item = {
        invoice_id: id,
        product_id: product.productId,
        quantity: product.quantity
      };
      this.subscriber = this.invoiceItemService.setItem(id, item).subscribe(res => console.log(res));
    });
  }
  canDeactivate() {
   return confirm('Are you sure you want to quit?');
  }
  get product(): FormArray {
    return this.invoiceForm.get('product') as FormArray;
  }
  get total() {
    let total = 0;
    this.product.controls.forEach(control => {
      total += +(control.value.price * (1 - this.invoiceForm.get('discount').value / 100));
    });
    return +total.toFixed(2);
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
