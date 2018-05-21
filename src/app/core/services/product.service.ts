import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/filter';


import {Product} from '../../models/product';
import { AppState } from '../../ngrx/app-state/app-state';
import * as productActions from '../../ngrx/product/actions';
import * as productGetters from '../../ngrx/product/states/products-getters.state';
import {
  getProductRequestLoader,
  getProductRequestState
} from '../../ngrx/requests/nested-states/products/states/products-getters.state';



@Injectable()
export class ProductService {

  products$: Observable<Product[]>;
  isData$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    ) {
    this.isData$ = this.store.select(getProductRequestLoader);
    this.products$ = Observable.combineLatest(
      this.store.select(productGetters.getCollectionProducts),
      this.isData$
    )
    .filter(([products, isData]) => isData)
    .map(([products, isData]) => products);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/products');
  }

  getListProductDispatch(): Observable<Product[]> {
    this.store.dispatch(new productActions.GetListProduct);
    return this.products$;
  }

}
