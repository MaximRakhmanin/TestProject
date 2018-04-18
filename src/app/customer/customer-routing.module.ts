import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from './customer.component';
import { CustomerResolverService } from '../core/resolvers/customer-resolver.service';

const routes: Routes = [
    { path: '', component: CustomerComponent, resolve: { data: CustomerResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
