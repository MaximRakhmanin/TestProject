import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditModeComponent } from './edit-mode.component';
import { EditInvoiceResolverService } from '../../shared/resolvers/edit-invoice-resolver.service';

const routes: Routes = [
  { path: '', component: EditModeComponent, resolve: { edit: EditInvoiceResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditModeRoutingModule { }
