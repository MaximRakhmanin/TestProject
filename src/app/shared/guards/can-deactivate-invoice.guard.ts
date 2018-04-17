import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NewInvoiceComponent } from '../../new-invoice/new-invoice.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate <NewInvoiceComponent> {
  canDeactivate(component: NewInvoiceComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
