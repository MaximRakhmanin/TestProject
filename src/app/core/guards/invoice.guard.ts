import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { InvoiceComponent } from '../../invoices/invoice/invoice.component';

@Injectable()
export class InvoiceGuard implements CanDeactivate <InvoiceComponent> {
  canDeactivate(component: InvoiceComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
