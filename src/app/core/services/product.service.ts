import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class ProductService {
  products$: Observable<Product[]>;
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
   return this.products$ = this.http.get<Product[]>('/products').shareReplay();
  }
  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }
}
