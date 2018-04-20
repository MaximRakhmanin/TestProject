import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Product } from '../../models/product';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @Input() products$;
  @Input() product;
  @Output() total = new EventEmitter();
  @Output() del = new EventEmitter();
  selectedPrice;
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
    Observable.combineLatest(
      this.products$,
      this.product.valueChanges
    )
    .map(([products, controls]: [Product[], any]) => {
      const prod = products.find(product => product.id === controls.product_id);
      return prod;
    }).subscribe(res => {
      this.selectedPrice = +(res.price * this.quantity.value).toFixed(2);
      this.total.emit(res.id);
    });
  }
  delete() {
    this.del.emit();
  }
}
