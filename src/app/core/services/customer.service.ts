import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';

import {Customer} from '../../models/customer';
import 'rxjs/add/observable/of';
import { StateManagement, StateRequests } from './state-management';
import { ConnectableObservable } from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/publishReplay';
import { Action } from '../../models/action';


@Injectable()
export class CustomerService {
  customers$: ConnectableObservable<Customer[]>;
  customer$: ConnectableObservable<Customer>;
  isData$: ConnectableObservable<boolean>;
  stateManagement: StateManagement<Customer> = new StateManagement<Customer>();
  constructor(private http: HttpClient) {
    
    this.customers$ = Observable.
    combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
    .map(([entities, ids]) =>
      ids.map(id => entities[id])
    )
    .publishReplay(1);
    this.customers$.connect();
    
    this.customer$ = Observable.
    combineLatest(
      this.stateManagement.entityId$,
      this.stateManagement.entities$
    )
    .map(([id, entities]) => {
      return entities[id];
    }).publishReplay(1);
    this.customer$.connect();
    
    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}: Action) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Remove) {
        return true;
      }
    }, false)
    .publishBehavior(false);
    this.isData$.connect();
  }
  
  getCustomers(): Observable<Customer[]> {
    this.stateManagement.getList$.next(this.http.get<Customer[]>('/customers'));
    return this.customers$;
  }
  getCustomer(id): Observable<Customer> {
    this.stateManagement.get$.next(this.http.get<Customer>(`/customers/${id}`));
    return this.customer$;
  }

}
