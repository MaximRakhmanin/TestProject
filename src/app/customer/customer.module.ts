import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import {CustomerComponent} from './customer.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CustomerRoutingModule,
      SharedModule,
  ],
  declarations: [
      CustomerComponent
  ]
})
export class CustomerModule { }
