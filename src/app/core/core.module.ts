import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InvoiceService} from './services/invoice.service';
import { HttpClientModule} from '@angular/common/http';
import {CustomerService} from './services/customer.service';
import {ProductService} from './services/product.service';

@NgModule({
  imports: [
    CommonModule
  ],
    exports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule
    ],
  declarations: [],
    providers: [
        InvoiceService,
        CustomerService,
        ProductService
    ],
})
export class CoreModule { }
