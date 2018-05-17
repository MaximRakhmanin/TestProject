import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { ProductService } from '../../../core/services/product.service';
import * as ProductActions from '../actions/product.actions';

@Injectable()
export class ProductEffects {

  @Effect()
  products$: Observable<Action> = this.actions$
  .ofType(ProductActions.Get_List)
  .switchMap(() => {
   return this.productService.getProducts()
    .map(products => {
      this.productService.isSuccessFullRequest$.next(true);
      return new ProductActions.GetListSuccessFullProduct(products);
    });
  });
  constructor(
    private productService: ProductService,
    private actions$: Actions,
    ) {
  }
}
