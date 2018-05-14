import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';
import { InvoiceItemsResolverService } from '../../core/resolvers/invoice-items-resolver.service';
import { ProductsResolverService } from '../../core/resolvers/products-resolver.service';
import { InvoiceComponent } from './invoice.component';
import { InvoiceCanLeaveGuard } from '../../core/guards/invoice-can-leave.guard';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    resolve:
      {
        invoiceItems: InvoiceItemsResolverService,
        invoice: InvoiceResolverService,
        products: ProductsResolverService,
        customers: CustomersResolverService
      },
    canDeactivate: [InvoiceCanLeaveGuard],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
