import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewModeComponent } from './view-mode.component';
import { InvoiceItemResolverService } from '../../core/resolvers/invoice-item-resolver.service';
import { ProductResolverService } from '../../core/resolvers/product-resolver.service';
import { CustomerResolverService } from '../../core/resolvers/customer-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ViewModeComponent,
    resolve:
      {
        invoiceItem: InvoiceItemResolverService,
        product: ProductResolverService,
        customer: CustomerResolverService,
      },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModeRoutingModule { }
