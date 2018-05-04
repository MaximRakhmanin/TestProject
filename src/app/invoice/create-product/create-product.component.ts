import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/delay';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  @Input() products;
  @Input() product;
  @Output() del = new EventEmitter();
  @Output() save = new EventEmitter();
  selectedPrice: number;
  productSubscription: Subscription;
  changeSubscription: Subscription;
  constructor() { }
  get prod() {
    return this.product.get('product_id') as FormControl;
  }
  get quantity() {
    return this.product.get('quantity') as FormControl;
  }
  ngOnInit() {
    this.productSubscription = this.product.valueChanges
    .startWith(this.product.value)
    .map((controls: any) => {
      return this.products.find(product => product.id === controls.product_id);
    }).subscribe(res => {
      this.selectedPrice = +(res.price * this.quantity.value).toFixed(2);
    });
   this.changeSubscription = this.product.valueChanges.subscribe(res => this.save.emit(res));
  }
  delete() {
    this.del.emit(this.product);
  }
  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.changeSubscription.unsubscribe();
  }
}
