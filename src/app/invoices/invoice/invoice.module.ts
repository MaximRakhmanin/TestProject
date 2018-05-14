import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoicesRoutingModule } from './invoice-routing.module';
import { InvoiceItemModule } from '../invoice-item/invoice-item.module';


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
