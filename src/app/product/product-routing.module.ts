import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product.component';
import { ProductResolverService } from '../core/resolvers/product-resolver.service';

const routes: Routes = [
    { path: '', component: ProductComponent, resolve: {product: ProductResolverService} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
