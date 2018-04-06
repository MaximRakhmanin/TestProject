import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceComponent} from './invoice.component';
import { InvoiceResolverService } from '../shared/resolvers/invoice-resolver.service';
import { CustomerResolverService } from '../shared/resolvers/customer-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    resolve: {invoice: InvoiceResolverService, customer: CustomerResolverService},
  },
 {path: 'view/:id', loadChildren: 'app/invoice/view-mode/view-mode.module#ViewModeModule'},
  {path: 'edit/:id', loadChildren: 'app/invoice/edit-mode/edit-mode.module#EditModeModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
