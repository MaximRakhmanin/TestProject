import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import {ProductComponent} from './product.component';
import {SharedModule} from '../shared/shared.module';
import {AngularMaterialModule} from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    ProductRoutingModule,
      SharedModule,
      AngularMaterialModule
  ],
  declarations: [
      ProductComponent
  ]
})
export class ProductModule { }
