import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { InvoiceItemService } from './services/invoice-item.service';
import {InvoiceService} from './services/invoice.service';
import {ProductService} from './services/product.service';
import {CustomerService} from './services/customer.service';
import { ModalService } from './services/modal.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { InvoiceItemResolverService } from './resolvers/invoice-item-resolver.service';
import { CustomersResolverService } from './resolvers/customers-resolver.service';
import { InvoicesResolverService } from './resolvers/invoices-resolver.service';
import { InvoiceResolverService } from './resolvers/invoice-resolver.service';
import { HttpHandleErrorService } from './services/http-handle-error.service';

import { CanDeactivateGuard } from './guards/can-deactivate-invoice.guard';
import { SpinnerService } from './services/spinner.service';
import { CollectionsService } from './services/collections.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
  ],
    providers: [
        InvoiceService,
        CustomerService,
        ProductService,
        ProductResolverService,
        CustomersResolverService,
        InvoicesResolverService,
        httpInterceptorProviders,
        InvoiceItemService,
        InvoiceItemResolverService,
        CanDeactivateGuard,
        ModalService,
        InvoiceResolverService,
        HttpHandleErrorService,
        SpinnerService,
        CollectionsService
    ],
})
export class CoreModule { }
