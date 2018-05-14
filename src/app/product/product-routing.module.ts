import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductsResolverService } from '../core/resolvers/products-resolver.service';

const routes: Routes = [
    { path: '', component: ProductComponent, resolve: {product: ProductsResolverService} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
