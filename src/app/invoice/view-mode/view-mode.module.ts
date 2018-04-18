import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewModeRoutingModule } from './view-mode-routing.module';
import { ViewModeComponent } from './view-mode.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ViewModeRoutingModule,
    SharedModule
  ],
  declarations: [
    ViewModeComponent
  ]
})
export class ViewModeModule { }
