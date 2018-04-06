import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InvoiceService} from './services/invoice.service';
import { HttpClientModule} from '@angular/common/http';
import {CustomerService} from './services/customer.service';
import {ProductService} from './services/product.service';
import { httpInterceptorProviders } from './interceptors';
import { ProductResolverService } from '../shared/resolvers/product-resolver.service';
import { CustomerResolverService } from '../shared/resolvers/customer-resolver.service';
import { InvoiceResolverService } from '../shared/resolvers/invoice-resolver.service';
import { InvoiceItemService } from './services/invoice-item.service';
import { InvoiceItemResolverService } from '../shared/resolvers/invoice-item-resolver.service';
import { EditInvoiceResolverService } from '../shared/resolvers/edit-invoice-resolver.service';

@NgModule({
  imports: [
    CommonModule
  ],
    exports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
    ],
  declarations: [],
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
        EditInvoiceResolverService
    ],
})
export class CoreModule { }
