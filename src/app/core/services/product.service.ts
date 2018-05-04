import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/Rx';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/filter';

import { Action } from '../../models/action';
import {Product} from '../../models/product';

import { StateManagement, StateRequests } from './state-management';

@Injectable()
export class ProductService {
  collection$: ConnectableObservable<Product[]>;
  addProduct$: ConnectableObservable<Product>;
  isData$: ConnectableObservable<boolean>;
  deleteProduct$: ConnectableObservable<Product>;
  newProduct = {name: 'NewProduct2', price: 35 } as Product;
  stateManagement: StateManagement<Product> = new StateManagement<Product>();
  constructor(private http: HttpClient) {
    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}: Action) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Remove) {
        return true;
      }
    }, false)
    .publishBehavior(false);
   this.isData$.connect();

    this.collection$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
    .map(([entities, ids]) =>
      ids.map(id => entities[id])
    )
    .publishReplay(1);
    this.collection$.connect();

    this.addProduct$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
    .map(([entities, id]) => entities[id])
    .publishReplay(1);
    this.addProduct$.connect();

    this.deleteProduct$ = this.stateManagement.responseData$
    .filter(response => response.type === StateRequests.Remove)
    .map(res => res.value[0])
    .publishReplay(1);
    this.deleteProduct$.connect();
  }
  getProducts(): Observable<Product[]> {
    this.stateManagement.getList$.next(this.http.get<Product[]>('/products'));
    return this.collection$;
  }
  setProduct(): Observable<Product> {
   this.stateManagement.add$.next(this.http.post<Product>('/products', this.newProduct));
   return this.addProduct$;
  }
  delete(id): Observable<Product> {
    this.stateManagement.remove$.next(this.http.delete<Product>(`/products/${id}`));
    return this.deleteProduct$;
  }
}
