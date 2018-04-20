import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInvoiceComponent } from './new-invoice.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-invoice.guard';
import { ProductResolverService } from '../../core/resolvers/product-resolver.service';
import { CustomerResolverService } from '../../core/resolvers/customer-resolver.service';



const routes: Routes = [
  { path: '', component: NewInvoiceComponent,
    resolve: { product: ProductResolverService, customer: CustomerResolverService},
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewInvoiceRoutingModule { }
