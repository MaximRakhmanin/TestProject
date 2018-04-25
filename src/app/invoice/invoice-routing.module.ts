import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceComponent} from './invoice.component';
import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';
import { InvoicesResolverService } from '../core/resolvers/invoices-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    resolve: {invoices: InvoicesResolverService, customers: CustomersResolverService},
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
