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
    private productService: ProductService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    this.validator();
    this.getData();
    this.getProduct();
    //this.editForm.valueChanges.subscribe(res => console.log(res));
    this.product.controls.forEach(group => group.valueChanges.subscribe(res => console.log(res)));
  }
  getData() {
    this.productService.products$.subscribe(res => this.products = res);
    this.customers$ = this.customerService.customers$;
    this.invoiceItemService.customer$.subscribe(res => this.editForm.controls['customer'].setValue(res.name));
    this.invoice$ = this.invoiceItemService.invoice$;
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
    this.editForm.controls['addProduct'].valueChanges.subscribe(res => {
     this.selectedProduct = this.products.find(product => product.id === res);
  });
}
  //getPro(i) {
  //  this.product.at(i).valueChanges.take(1).subscribe(res => console.log(res));
  //}
}
