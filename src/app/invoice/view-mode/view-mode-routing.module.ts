import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewModeComponent } from './view-mode.component';
import { InvoiceItemResolverService } from '../../core/resolvers/invoice-item-resolver.service';
import { ProductResolverService } from '../../core/resolvers/product-resolver.service';
import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ViewModeComponent,
    resolve:
      {
        invoiceItem: InvoiceItemResolverService,
        product: ProductResolverService,
        customers: CustomersResolverService,
        invoice: InvoiceResolverService
      },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModeRoutingModule { }
