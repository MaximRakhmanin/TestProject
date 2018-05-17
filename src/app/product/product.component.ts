import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

import { Product } from '../models/product';
import { ProductService } from '../core/services/product.service';

@Component({
selector: 'app-product',
templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products$: Observable<Product[]>;
  displayedColumns = ['id', 'name', 'price'];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.products$ = this.productService.products$;
  }

}
