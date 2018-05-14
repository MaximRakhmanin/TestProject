import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

import { Product } from '../../models/product';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {

  constructor(
    private productService: ProductService
  ) {}

  resolve(): Observable<Product[]> {
    const product = this.productService.isData$.switchMap(isData => {
      if (isData) {
        return this.productService.products$;
      }
      return this.productService.getProducts();
    }).take(1);

    return product;
   // return this.productService.getProducts().take(1);
  }
}
