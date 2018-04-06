import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import {InvoiceComponent} from './invoice.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    AngularMaterialModule
  ],
  declarations: [
      InvoiceComponent
  ]
})
export class InvoiceModule { }
