import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product.component';
import { ProductResolverService } from '../shared/resolvers/product-resolver.service';

const routes: Routes = [
    { path: '', component: ProductComponent, resolve: {data: ProductResolverService} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
