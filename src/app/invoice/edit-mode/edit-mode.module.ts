import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditModeRoutingModule } from './edit-mode-routing.module';
import { EditModeComponent } from './edit-mode.component';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    EditModeRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  declarations: [
    EditModeComponent
  ]
})
export class EditModeModule { }
