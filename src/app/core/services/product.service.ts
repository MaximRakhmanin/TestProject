import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  products$: Observable<Product[]>;
  constructor(private http: HttpClient) { }
  getProducts() {
    this.products$ = this.http.get<Product[]>('/products');
  }
  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }
}
