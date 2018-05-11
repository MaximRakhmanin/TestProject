import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoices-routing.module';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoicesComponent } from './invoices.component';

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
      InvoicesComponent,
  ]
})
export class InvoiceModule { }
