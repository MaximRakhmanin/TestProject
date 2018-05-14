import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ProductRoutingModule,
    SharedModule,
  ],
  declarations: [
    ProductComponent
  ]
})
export class ProductModule { }
