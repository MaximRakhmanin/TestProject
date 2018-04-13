import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { NewInvoiceComponent } from './new-invoice.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewInvoiceRoutingModule,
    AngularMaterialModule,
    SharedModule,
    
  ],
  declarations: [
    NewInvoiceComponent
  ]
})
export class NewInvoiceModule { }
