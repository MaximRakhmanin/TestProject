import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceResolverService } from '../shared/resolvers/new-invoice-resolver.service';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-invoice.guard';

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
