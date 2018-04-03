import { Component, OnInit } from '@angular/core';
import {ProductService} from '../core/services/product.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product;
  displayedColumns = ['name', 'price'];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.productService.getProduct().subscribe(res => this.products = res);
  }
}
