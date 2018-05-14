import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { InvoiceListRoutingModule } from './invoice-list-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceListComponent } from './invoice-list.component';

@NgModule({
  imports: [
    CommonModule,
    InvoiceListRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
  declarations: [
    InvoiceListComponent,
  ]
})
export class InvoiceListModule { }
