import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InvoiceService} from './services/invoice.service';
import { HttpClientModule} from '@angular/common/http';
import {CustomerService} from './services/customer.service';
import {ProductService} from './services/product.service';
import { httpInterceptorProviders } from './interceptors';

import { InvoiceItemService } from './services/invoice-item.service';

import { ModalService } from './services/modal.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { CustomerResolverService } from './resolvers/customer-resolver.service';
import { InvoiceResolverService } from './resolvers/invoice-resolver.service';
import { InvoiceItemResolverService } from './resolvers/invoice-item-resolver.service';
import { EditInvoiceResolverService } from './resolvers/edit-invoice-resolver.service';
import { NewInvoiceResolverService } from './resolvers/new-invoice-resolver.service';
import { CanDeactivateGuard } from './guards/can-deactivate-invoice.guard';

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
        CustomerResolverService,
        InvoiceResolverService,
        httpInterceptorProviders,
        InvoiceItemService,
        InvoiceItemResolverService,
        EditInvoiceResolverService,
        NewInvoiceResolverService,
        CanDeactivateGuard,
        ModalService
    ],
})
export class CoreModule { }
