import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewModeComponent } from './view-mode.component';
import { InvoiceItemResolverService } from '../../shared/resolvers/invoice-item-resolver.service';

const routes: Routes = [
  { path: '', component: ViewModeComponent, resolve: { invoiceItem: InvoiceItemResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModeRoutingModule { }
