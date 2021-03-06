import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';

const routes: Routes = [
    { path: '', component: CustomerComponent, resolve: { customers: CustomersResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
