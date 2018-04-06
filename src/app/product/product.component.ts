import { Component, OnInit } from '@angular/core';
import {ProductService} from '../core/services/product.service';
import {Product} from '../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$: Observable<Product>;
  displayedColumns = ['name', 'price'];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
     this.products$ = this.productService.products$;
  }

}
