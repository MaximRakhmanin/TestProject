import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'invoice', pathMatch: 'full'},
    { path: 'product', loadChildren: 'app/product/product.module#ProductModule'},
    { path: 'customer', loadChildren: 'app/customer/customer.module#CustomerModule'},
    { path: 'invoice', loadChildren: 'app/invoice/invoice.module#InvoiceModule'},
    { path: '**', loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
