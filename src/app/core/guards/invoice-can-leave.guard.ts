import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { InvoiceComponent } from '../../invoices/invoice/invoice.component';

@Injectable()
export class InvoiceCanLeaveGuard implements CanDeactivate <InvoiceComponent> {

  canDeactivate(component: InvoiceComponent) {
    return component.canLeave ? component.canLeave() : true;
  }
}
