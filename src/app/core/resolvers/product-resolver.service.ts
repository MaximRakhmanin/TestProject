import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService) { }
  resolve(): Observable<Product[]> {
    if (this.productService.products$){
      return this.productService.products$;
    }
    return this.productService.getProducts();
  }
}
