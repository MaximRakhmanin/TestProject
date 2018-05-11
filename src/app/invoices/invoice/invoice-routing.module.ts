import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';
import { InvoiceItemResolverService } from '../../core/resolvers/invoice-item-resolver.service';
import { ProductResolverService } from '../../core/resolvers/product-resolver.service';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-invoice.guard';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    resolve:
      {
        invoiceItems: InvoiceItemResolverService,
        invoice: InvoiceResolverService,
        products: ProductResolverService,
        customers: CustomersResolverService
      },
    canDeactivate: [CanDeactivateGuard],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
