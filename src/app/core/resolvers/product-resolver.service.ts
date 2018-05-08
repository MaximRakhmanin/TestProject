import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ProductResolverService implements Resolve<Product[]> {

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
