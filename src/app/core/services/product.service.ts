import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../../models/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  getProduct(): Observable<Product> {
    return this.http.get<Product>('http://api.invoice-app.2muchcoffee.com/api/products');
  }
}
