import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material';

@NgModule({
    exports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
})
export class SharedModule { }
