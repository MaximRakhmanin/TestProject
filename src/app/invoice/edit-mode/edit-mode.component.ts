import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { Invoice } from '../../models/invoice';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  invoice$: Observable<Invoice>;
  products;
  editForm: FormGroup;
  constructor(
    private customerService: CustomerService,
    private invoiceItemService: InvoiceItemService,
    private fb: FormBuilder
  ) {
  }
  ngOnInit() {
    this.validator();
    this.getData();
  }
  getData() {
    this.customers$ = this.customerService.customers$;
    this.invoiceItemService.customer$.subscribe(res => this.editForm.controls['customer'].setValue(res.name));
    this.invoice$ = this.invoiceItemService.invoice$;
    this.products$ = Observable.combineLatest(this.invoiceItemService.products$,
      this.invoiceItemService.items$).map(([products, items]) => {
      return products.map(product => {
        product.item = items.find(item => {
         return item.product_id === product.id; });
        return product;
      });
    });
    this.products$.subscribe(res => this.products = res.map(product => {
      const p = <FormArray>this.editForm.controls['product'];
      p.push(this.fb.group({
        productName: product.name,
        productQuantity: product.item.quantity,
        productPrice: product.price
      })); }
      ));
    console.log(this.product);
  }
  get product(): FormArray {
    return this.editForm.get('product') as FormArray;
  }
  validator() {
    this.editForm = this.fb.group({
      customer: '',
      product: this.fb.array([]),
      addProduct: '',
      addquantity: '',
      addprice: ''
    });
  }
}
