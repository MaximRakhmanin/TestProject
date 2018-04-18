import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { Invoice } from '../../models/invoice';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
  customers$: Observable<Customer[]>;
  products: Product[];
  invoice$: Observable<Invoice>;
  productsItem$;
  selectedProduct;
  editForm: FormGroup;
  constructor(
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    this.validator();
    this.getData();
    this.getProduct();
    this.addProduct();
  }
  getData() {
    this.productService.products$.subscribe(res => this.products = res);
    this.customers$ = this.customerService.customers$;
    this.invoiceItemService.customer$.subscribe(res => this.editForm.controls['customer'].setValue(res.name));
    this.invoice$ = this.invoiceService.invoice$;
    this.productsItem$ = Observable.combineLatest(this.invoiceItemService.products$,
      this.invoiceItemService.items$).map(([products, items]) => {
      return products.map(product => {
        product.item = items.find(item => {
         return item.product_id === product.id; });
        return product;
      });
    });
    this.productsItem$.subscribe(res => res.map(product => {
      const p = <FormArray>this.editForm.controls['product'];
      p.push(this.fb.group({
        productId: product.id,
        productName: product.name,
        productQuantity: product.item.quantity,
        productPrice: product.price
      })); }
      ));
  }
  get product(): FormArray {
    return this.editForm.get('product') as FormArray;
  }
  validator() {
    this.editForm = this.fb.group({
      customer: '',
      product: this.fb.array([]),
      addProduct: '',
      addquantity: [1, Validators.required],
      addprice: ''
    });
  }
  getProduct() {
   console.log(this.product.controls);
}
  addProduct() {
    this.editForm.get('addProduct').valueChanges.subscribe(res => {
      const product = this.products.find(prod => prod.id === res);
      const p = <FormArray>this.editForm.controls['product'];
      p.push(this.fb.group({
        productId: product.id,
        productName: product.name,
        productQuantity: this.editForm.get('addquantity').value,
        productPrice: product.price
      }));
    });
  }
}
