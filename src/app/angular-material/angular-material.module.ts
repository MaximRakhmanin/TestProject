import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
    exports: [
        MatToolbarModule,
        MatMenuModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class AngularMaterialModule { }
