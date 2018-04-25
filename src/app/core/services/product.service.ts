import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Product} from '../../models/product';



@Injectable()
export class ProductService {
  products$: Observable<Product[]>;
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
   return this.products$ = this.http.get<Product[]>('/products')
   .shareReplay(1)
    .catch(err => {
      return Observable.throw(err);
    }) ;
  }
  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`)
    .shareReplay(1)
     .catch(error => {
       return Observable.throw(error);
     });
  }
}
