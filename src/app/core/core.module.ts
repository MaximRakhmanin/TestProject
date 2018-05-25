import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { httpInterceptorProviders } from './interceptors';
import { InvoiceItemService } from './services/invoice-item.service';
import { InvoiceService } from './services/invoice.service';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { ModalService } from './services/modal.service';
import { SpinnerService } from './services/spinner.service';
import { ProductsResolverService } from './resolvers/products-resolver.service';
import { InvoiceItemsResolverService } from './resolvers/invoice-items-resolver.service';
import { CustomersResolverService } from './resolvers/customers-resolver.service';
import { InvoicesResolverService } from './resolvers/invoices-resolver.service';
import { InvoiceResolverService } from './resolvers/invoice-resolver.service';
import { InvoiceCanLeaveGuard } from './guards/invoice-can-leave.guard';
import { ProductEffects } from '../ngrx/product/effects';
import { ProductGetEffect } from '../ngrx/requests/nested-states/products/effects';
import { reducers } from '../ngrx/app-state/app-state';
import { CustomersGetEffect } from '../ngrx/requests/nested-states/customers/effects';
import { CustomersEffects } from '../ngrx/customers/effects';
import { InvoiceItemEffects } from '../ngrx/invoice-item/effects';
import { ItemGetListEffect } from '../ngrx/requests/nested-states/invoice-item/nested-states/get-list-items/effects';
import { PostItemEffect } from '../ngrx/requests/nested-states/invoice-item/nested-states/post-item/effects';
import { PutItemEffect } from '../ngrx/requests/nested-states/invoice-item/nested-states/put-item/effects';
import { DeleteItemEffect } from '../ngrx/requests/nested-states/invoice-item/nested-states/delete-item/effects/delete-item.effects';
import { InvoiceEffects } from '../ngrx/invoices/effects';
import { InvoiceGetListEffect } from '../ngrx/requests/nested-states/invoices/nested-states/get-list-invoices/effects';
import { DeleteInvoiceEffect } from '../ngrx/requests/nested-states/invoices/nested-states/delete-invoice/effects';
import { PostInvoiceEffect } from '../ngrx/requests/nested-states/invoices/nested-states/post-invoice/effects';
import { PutInvoiceEffect } from '../ngrx/requests/nested-states/invoices/nested-states/put-invoice/effects';
import { GetInvoiceEffect } from '../ngrx/requests/nested-states/invoices/nested-states/get-invoice/effects';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([
      ProductEffects,
      CustomersEffects,
      InvoiceItemEffects,
      InvoiceEffects,

      // requests
      ProductGetEffect,
      CustomersGetEffect,
      ItemGetListEffect,
      PostItemEffect,
      PutItemEffect,
      DeleteItemEffect,
      InvoiceGetListEffect,
      DeleteInvoiceEffect,
      PostInvoiceEffect,
      PutInvoiceEffect,
      GetInvoiceEffect
    ])
  ],
  providers: [
    InvoiceService,
    CustomerService,
    ProductService,
    ProductsResolverService,
    CustomersResolverService,
    InvoicesResolverService,
    httpInterceptorProviders,
    InvoiceItemService,
    InvoiceItemsResolverService,
    InvoiceCanLeaveGuard,
    ModalService,
    InvoiceResolverService,
    SpinnerService,
    ],
})
export class CoreModule { }
