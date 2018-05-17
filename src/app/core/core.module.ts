import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../ngrx/product/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../ngrx/product/effects';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      products: productReducer
    }),
    EffectsModule.forRoot([
      ProductEffects
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
