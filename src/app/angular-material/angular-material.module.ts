import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

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
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class AngularMaterialModule { }
