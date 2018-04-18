
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HeaderComponent} from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      ModalComponent,
  ],
  imports: [
      AppRoutingModule,
      CoreModule,
      SharedModule,
      MatToolbarModule,
      MatMenuModule,
      MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
