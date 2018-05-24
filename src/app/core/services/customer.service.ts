import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';

import { Customer } from '../../models/customer';

import { AppState } from '../../ngrx/app-state/app-state';
import { getCollectionCustomers } from '../../ngrx/customers/states/customers-getters.states';
import { getCustomersRequestLoader } from '../../ngrx/requests/nested-states/customers/states/customers-getters.state';
import { GetListCustomers } from '../../ngrx/customers/actions';

@Injectable()
export class CustomerService {

  customers$: Observable<Customer[]>;
  isData$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.isData$ = this.store.select(getCustomersRequestLoader);

    this.customers$ = Observable.combineLatest(
      this.store.select(getCollectionCustomers),
      this.isData$
    )
    .filter(([customers, isData]) => isData)
    .map(([customers, isData]) => customers);
  }

  CustomersRequest(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/customers');
  }

  getCustomers() {
    this.store.dispatch(new GetListCustomers);
    return this.customers$;
  }

}
