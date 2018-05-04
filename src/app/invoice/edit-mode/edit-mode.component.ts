import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';

import { Product } from '../../models/product';
import { Customer } from '../../models/customer';
import { Invoice } from '../../models/invoice';
import { InvoiceItem } from '../../models/invoice-item';

import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { ProductService } from '../../core/services/product.service';
import { FormArrayItem } from '../../models/FormArrayItem';


@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  customers$: Observable<Customer[]>;
  invoice$: Observable<Invoice>;
  items$: Observable<InvoiceItem[]>;
  invoice;
  editForm: FormGroup;
  updateInvoiceItem: Subject<InvoiceItem> = new Subject<InvoiceItem>();
  deleteInvoice = new Subject();
  itemsSubscription: Subscription;
  invoiceSubscription: Subscription;
  productSubscription: Subscription;
  customerSubscription: Subscription;
  updateInvoiceItemSubscription: Subscription;
  deleteInvoiceSubscription: Subscription;
  totalSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService
  ) {}

  ngOnInit() {
    this.getData();
    this.invoiceSubscription = this.invoice$.subscribe(res => this.invoice = res);
    this.validate();
    this.itemsSubscription = this.items$.subscribe(res => {
      return res.forEach(item => this.addProduct(item));
    });
    this.productSubscription = this.product.valueChanges
    .switchMap(prod_id => {
      return this.invoiceItemService.setItem(this.invoice.id, { product_id: prod_id, quantity: 1}).take(1);
    })
    .switchMap((res) => {
      return this.invoiceService.update(this.invoice.id, { total: this.total.value }).take(1)
      .mapTo(res);
    })
    .map(item => this.addProduct(item))
    .subscribe();

    this.customerSubscription = this.customer.valueChanges.switchMap((customer_id) => {
     return this.invoiceService.update(this.invoice.id, { customer_id: customer_id });
    }).subscribe();

    this.updateInvoiceItemSubscription = this.updateInvoiceItem
    .debounceTime(1000)
    .switchMap((item) => {
    return  this.invoiceItemService.update(this.invoice.id, item.id,
     { invoice_id: this.invoice.id, product_id: item.product_id, quantity: item.quantity }).take(1);
   })
   .switchMap((invItem: InvoiceItem) => this.invoiceService.update(invItem.invoice_id, {total: this.total.value}))
    .subscribe();

  this.deleteInvoiceSubscription = this.deleteInvoice
  .switchMap((item: FormArrayItem) => {
    return this.invoiceItemService.delete(this.invoice.id, item.id);
  })
  .switchMap(() => this.invoiceService.update(this.invoice.id, {total: this.total.value}))
  .subscribe();
    this.totalSubscription = Observable
    .combineLatest(
      this.items.valueChanges
      .startWith(this.items.value),
      this.products$
    )
    .map(([items, products]: [any, Product[]]) => {
      return items.map(item => {
        item.product = products.find(product => product.id === item.product_id);
        return item;
      });
    }).subscribe(res => this.getTotal(res));
  }
  ngOnDestroy() {
   this.itemsSubscription.unsubscribe();
   this.invoiceSubscription.unsubscribe();
   this.productSubscription.unsubscribe();
   this.customerSubscription.unsubscribe();
   this.updateInvoiceItemSubscription.unsubscribe();
   this.deleteInvoiceSubscription.unsubscribe();
   this.totalSubscription.unsubscribe();
  }

  get product() {
    return this.editForm.get('addProduct');
  }
  get quantity() {
    return this.editForm.get('quantity');
  }
  get items() {
    return this.editForm.get('product') as FormArray;
  }
  get customer() {
   return  this.editForm.get('customer_id');
  }
  get total() {
    return this.editForm.get('total');
  }

  getData() {
    this.items$ = this.invoiceItemService.collection$.take(1);
    this.products$ = this.productService.collection$;
    this.customers$ = this.customerService.customers$;
    this.invoice$ = this.invoiceService.invoice$;
  }
  addProduct(invoiceItem) {
    this.items.push(new FormGroup({
      product_id: new FormControl(invoiceItem.product_id),
      quantity: new FormControl(invoiceItem.quantity),
      id: new FormControl(invoiceItem.id),
    }));
  }
  validate() {
    this.editForm = new FormGroup({
      customer_id: new FormControl(this.invoice.customer_id),
      addProduct: new FormControl(''),
      quantity: new FormControl(''),
      product: new FormArray([]),
      total: new FormControl(),
    });
  }
  delete(item, index) {
    this.deleteInvoice.next(item.value);
    this.items.removeAt(index);
  }
  getTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += +(item.product.price * item.quantity) * (1 - this.invoice.discount / 100);
    });
    this.total.setValue(total);
  }
  save(item) {
    this.updateInvoiceItem.next(item);
  }
}
