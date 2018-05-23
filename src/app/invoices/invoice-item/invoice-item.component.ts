import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/last';

import { InvoiceItem } from '../../models/invoice-item';

import { InvoiceItemService } from '../../core/services/invoice-item.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit, OnDestroy {

  onDelete$: Subject<InvoiceItem> = new Subject<InvoiceItem>();
  price$: Observable<number>;

  private subscriptions: {
    setPrice?: Subscription;
    updateItem?: Subscription;
    deleteItem?: Subscription;
  } = {};

  @Input() products;
  @Input() itemGroup;
  @Input() isEdit;

  @Output() remove = new EventEmitter();

  constructor(
    private invoiceItemService: InvoiceItemService
  ) {}

  get productId() {
    return this.itemGroup.get('product_id');
  }

  get quantity() {
    return this.itemGroup.get('quantity');
  }

  get price() {
    return this.itemGroup.get('price');
  }

  ngOnInit() {
    this.price$ = Observable.merge(
      this.productId.valueChanges.startWith(this.productId.value),
      this.quantity.valueChanges.startWith(this.quantity.value),
    )
    .map(() => this.products.find(product => product.id === this.productId.value))
    .map((product) => +(product.price * this.quantity.value));

    this.subscriptions.setPrice = this.price$
    .subscribe(price => {
      this.price.setValue(price);
    });

    // delete item
    this.subscriptions.deleteItem = this.onDelete$
    .switchMap((invoiceItem: InvoiceItem) => {
      if (this.isEdit) {
        return this.invoiceItemService.deleteItem(invoiceItem).take(1);
      }
      return Observable.of(invoiceItem);
    })
    .subscribe(() => this.remove.emit());

    // update invoice
    this.subscriptions.updateItem = Observable.merge(
      this.productId.valueChanges,
      this.quantity.valueChanges,
    )
    .filter(() => this.isEdit)
    .filter(() => this.quantity.value > 0)
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(() => {
      return this.invoiceItemService.updateItem(this.itemGroup.value);
    })
    .publish()
    .connect();
  }

  ngOnDestroy() {
    this.subscriptions.setPrice.unsubscribe();
    this.subscriptions.updateItem.unsubscribe();
    this.subscriptions.deleteItem.unsubscribe();
  }

  deleteItem() {
    this.onDelete$.next(this.itemGroup.value);
  }
}
