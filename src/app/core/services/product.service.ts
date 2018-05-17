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
import * as ProductActions from '../../ngrx/product/actions/product.actions';
import * as ProductGetters from '../../ngrx/product/states/products-getters.state';


@Injectable()
export class ProductService {

  products$: Observable<Product[]>;
  isData$: ConnectableObservable<boolean>;
  isSuccessFullRequest$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    ) {

    this.isData$ = this.isSuccessFullRequest$.publishBehavior(false);
    this.isData$.connect();

    this.products$ = this.store.select(ProductGetters.getCollectionProducts)
    .filter(product => !!product);

  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/products');
  }

  getListProductDispatch(): Observable<Product[]> {
    this.store.dispatch(new ProductActions.GetListProduct);
    return this.products$;
  }

}
