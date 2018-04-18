import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceComponent} from './invoice.component';
import { InvoiceResolverService } from '../core/resolvers/invoice-resolver.service';
import { CustomerResolverService } from '../core/resolvers/customer-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    resolve: {invoice: InvoiceResolverService, customer: CustomerResolverService},
  },
 {path: 'view/:id', loadChildren: 'app/invoice/view-mode/view-mode.module#ViewModeModule'},
  {path: 'edit/:id', loadChildren: 'app/invoice/edit-mode/edit-mode.module#EditModeModule'},
  {path: 'new', loadChildren: 'app/invoice/new-invoice/new-invoice.module#NewInvoiceModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
