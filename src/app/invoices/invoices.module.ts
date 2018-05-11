import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import {InvoiceComponent} from './invoice.component';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  declarations: [
      InvoiceComponent
  ]
})
export class InvoiceModule { }