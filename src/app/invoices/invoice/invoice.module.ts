import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { InvoiceItemModule } from '../invoice-item/invoiceItem.module';


@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    InvoiceItemModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    InvoiceComponent
  ]
})
export class InvoicesModule { }
