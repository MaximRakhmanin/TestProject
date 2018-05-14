import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceItemComponent } from './invoice-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  declarations: [
    InvoiceItemComponent
  ],
  exports: [InvoiceItemComponent]
})
export class InvoiceItemModule { }
