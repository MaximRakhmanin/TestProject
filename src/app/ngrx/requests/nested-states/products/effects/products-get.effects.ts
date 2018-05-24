import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ProductService } from '../../../../../core/services/product.service';
import * as requestProductsActions from '../actions';

@Injectable()
export class ProductGetEffect {

  @Effect()
  productGetRequest$: Observable<Action> = this.actions$
  .ofType(requestProductsActions.productsActionTypes.REQUEST)
  .switchMap(action => {
    return this.productService.ProductsRequest()
    .map(products => new requestProductsActions.ProductGetSuccessAction(products))
    .catch(error => Observable.of(new requestProductsActions.ProductGetFailAction(error)));
  });

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}