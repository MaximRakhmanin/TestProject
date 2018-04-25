import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { NewInvoiceComponent } from './new-invoice.component';
import { SharedModule } from '../../shared/shared.module';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateProductModule } from '../create-product/create-product.module';

@NgModule({
  imports: [
    CommonModule,
    NewInvoiceRoutingModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CreateProductModule
  ],
  declarations: [
    NewInvoiceComponent,
  ]
})
export class NewInvoiceModule { }
