import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import {CustomerComponent} from './customer.component';
import {SharedModule} from '../shared/shared.module';
import {AngularMaterialModule} from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CustomerRoutingModule,
      SharedModule,
      AngularMaterialModule
  ],
  declarations: [
      CustomerComponent
  ]
})
export class CustomerModule { }
