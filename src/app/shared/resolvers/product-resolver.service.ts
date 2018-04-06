import { Injectable } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Resolve } from '@angular/router';

@Injectable()
export class ProductResolverService implements Resolve<void> {

  constructor(private productService: ProductService) { }
  resolve() {
    this.productService.getProducts();
  }
}
