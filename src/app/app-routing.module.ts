import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesResolverService } from './core/resolvers/invoices-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: {invoices: InvoicesResolverService},
    children: [
      { path: '', redirectTo: 'invoice', pathMatch: 'full' },
      { path: 'product', loadChildren: 'app/product/product.module#ProductModule' },
      { path: 'customer', loadChildren: 'app/customer/customer.module#CustomerModule' },
      { path: 'invoice', loadChildren: 'app/invoices/invoices.module#InvoiceModule' },
      { path: '**', loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule' }
    ],
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
