import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NewInvoiceComponent } from '../../new-invoice/new-invoice.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate <NewInvoiceComponent> {
  canDeactivate(component: NewInvoiceComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
