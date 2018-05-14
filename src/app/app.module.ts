import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';


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
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
