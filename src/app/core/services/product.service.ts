import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  getProduct() {
    return this.http.get('http://api.invoice-app.2muchcoffee.com/api/products');
  }
}
