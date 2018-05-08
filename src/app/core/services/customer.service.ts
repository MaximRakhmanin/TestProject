import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { ConnectableObservable } from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/publishReplay';

import {Customer} from '../../models/customer';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';

@Injectable()
export class CustomerService {
  customers$: Observable<Customer[]>;
  customer$: Observable<Customer>;
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
    );

    this.customer$ = Observable.
    combineLatest(
      this.stateManagement.entityId$,
      this.stateManagement.entities$
    )
    .map(([id, entities]) => {
      return entities[id];
    });

    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}) => {
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
