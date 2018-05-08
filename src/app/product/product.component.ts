import { Component, OnDestroy, OnInit } from '@angular/core';

import {ProductService} from '../core/services/product.service';
import {Product} from '../models/product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  displayedColumns = ['id', 'name', 'price', 'delete'];
  productDisplay$;
  addProduct$ = new Subject();
  deleteProduct$ = new Subject();
  deleteProductSubscription: Subscription;
  requestProduct$;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.products$;

    this.requestProduct$ = this.addProduct$
    .switchMap(() => this.productService.setProduct()).shareReplay(1);
    this.requestProduct$.subscribe();

    this.productDisplay$ = Observable.merge(
      this.requestProduct$,
      this.requestProduct$
      .debounceTime(2000).mapTo(null)
    );
    this.deleteProductSubscription = this.deleteProduct$.switchMap(id => this.productService.delete(id)).subscribe();
  }
  ngOnDestroy() {
    this.deleteProductSubscription.unsubscribe();
  }
  addProduct() {
    this.addProduct$.next(null);
  }
  delete(id) {
    this.deleteProduct$.next(id);
  }

}
