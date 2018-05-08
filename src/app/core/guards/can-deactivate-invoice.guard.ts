import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { InvoicesComponent } from '../../invoice/invoices/invoices.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate <InvoicesComponent> {
  canDeactivate(component: InvoicesComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
