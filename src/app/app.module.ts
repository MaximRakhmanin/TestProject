
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {AngularMaterialModule} from './angular-material/angular-material.module';


@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
  ],
  imports: [
      AppRoutingModule,
      CoreModule,
      SharedModule,
      AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
