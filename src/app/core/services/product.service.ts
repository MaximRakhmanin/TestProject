import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
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
import 'rxjs/add/operator/debounceTime';

import {Product} from '../../models/product';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';


@Injectable()
export class ProductService {

  products$: Observable<Product[]>;
  addProduct$: Observable<Product>;

  isData$: ConnectableObservable<boolean>;
  deleteProduct$: Observable<Product>;
  stateManagement: StateManagement<Product> = new StateManagement<Product>();

  constructor(
    private http: HttpClient,
    ) {

    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Remove) {
        return true;
      }
    }, false)
    .publishBehavior(false);
    this.isData$.connect();

    this.products$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$,
    )
    .map(([entities, ids]) => {
      return ids.filter(id => entities[id]).map(id => entities[id]);
    });

    this.addProduct$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
    .debounceTime(10)
    .map(([entities, id]) => entities[id]);

    this.deleteProduct$ = this.stateManagement.responseData$
    .filter(response => response.type === StateRequests.Remove)
    .map(res => res.value[0]);
  }

  getProducts(): Observable<Product[]> {
    this.stateManagement.getList$.next(this.http.get<Product[]>('/products'));
    return this.products$;
  }

}
