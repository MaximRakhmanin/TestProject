import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {FormControl} from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @Input() products;
  @Input() product;
  @Output() total = new EventEmitter();
  @Output() del = new EventEmitter();
  selectedPrice: number;
  constructor() { }
  get prod() {
    return this.product.get('product_id') as FormControl;
  }
  get quantity() {
    return this.product.get('quantity') as FormControl;
  }
  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.product.valueChanges
    .startWith(this.product.value)
    .map((controls: any) => {
      return this.products.find(product => product.id === controls.product_id);
    }).subscribe(res => {
      this.selectedPrice = +(res.price * this.quantity.value).toFixed(2);
      this.total.emit(res.id);
    });
  }
  delete() {
    this.del.emit();
  }
}
