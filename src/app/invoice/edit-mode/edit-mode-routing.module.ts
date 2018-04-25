import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditModeComponent } from './edit-mode.component';
import { EditInvoiceResolverService } from '../../core/resolvers/edit-invoice-resolver.service';
import { ProductResolverService } from '../../core/resolvers/product-resolver.service';
import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';

const routes: Routes = [
  {
    path: '', component: EditModeComponent,
    resolve:
      {
        edit: EditInvoiceResolverService,
        product: ProductResolverService,
        customers: CustomersResolverService,
        invoice: InvoiceResolverService
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditModeRoutingModule { }
