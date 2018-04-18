import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import {CustomerComponent} from './customer.component';
import {SharedModule} from '../shared/shared.module';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CustomerRoutingModule,
      SharedModule,
      MatSelectModule,
      MatFormFieldModule,
      MatInputModule,
  ],
  declarations: [
      CustomerComponent
  ]
})
export class CustomerModule { }
