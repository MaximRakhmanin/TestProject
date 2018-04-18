import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInvoiceComponent } from './new-invoice.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-invoice.guard';
import { NewInvoiceResolverService } from '../../core/resolvers/new-invoice-resolver.service';



const routes: Routes = [
  { path: '', component: NewInvoiceComponent,
    resolve: { newInvoice: NewInvoiceResolverService},
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewInvoiceRoutingModule { }
