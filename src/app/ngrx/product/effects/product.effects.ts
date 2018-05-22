import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as productActions from '../actions';
import * as ProductActions from '../actions/product.actions';
import { ProductService } from '../../../core/services/product.service';
import { ProductGetAction } from '../../requests/nested-states/products/actions';
import * as requestProductsActions from '../../requests/nested-states/products/actions';

@Injectable()
export class ProductEffects {
  @Effect()
  products$ = this.actions$
  .ofType(ProductActions.Get_List)
  .map(() => {
   return new ProductGetAction();
  });

  @Effect()
  productRequest$: Observable<Action> = this.actions$
  .ofType<productActions.Actions>(requestProductsActions.productsActionTypes.REQUEST_SUCCESS)
  .map(products => new productActions.GetListSuccessFullProduct(products.payload));

  constructor(
    private productService: ProductService,
    private actions$: Actions,
    ) {
  }
}
