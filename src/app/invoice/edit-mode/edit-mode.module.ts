import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditModeRoutingModule } from './edit-mode-routing.module';
import { EditModeComponent } from './edit-mode.component';
import { SharedModule } from '../../shared/shared.module';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateProductModule } from '../create-product/create-product.module';

@NgModule({
  imports: [
    CommonModule,
    EditModeRoutingModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    CreateProductModule
  ],
  declarations: [
    EditModeComponent,
  ]
})
export class EditModeModule { }
