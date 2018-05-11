import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/publishLast';

import { Customer } from '../../models/customer';
import { Product } from '../../models/product';

import { ModalService } from '../../core/services/modal.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { ConnectableObservable } from 'rxjs/Rx';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  saveForm$: Subject<any>;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  form: FormGroup;
  newItem = new FormControl('', [Validators.required]);
  subscriptions: {
    createItem?: Subscription;
    setTotalPrice?: Subscription;
    addedInvoice?: Subscription;
    updateInvoice?: Subscription;
    modal?: Subscription;
  } = {};
  checkModal$ = new Subject<any>();
  out$: ConnectableObservable<boolean>;
  isSuccessFullResponse$;
  requestInvoice$;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService,
  ) {
  }

  get customerId() {
    return this.form.get('customer_id');
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  get discount() {
    return this.form.get('discount');
  }

  get total() {
    return this.form.get('total');
  }

  get invoice() {
    return this.route.snapshot.data.invoice || null;
  }

  get invoiceId() {
    return this.invoice ? this.invoice.id : null;
  }

  get isEdit() {
    return this.route.snapshot.data.type === 'edit';
  }

  ngOnInit() {
    this.createForm();
    this.saveForm$ = new Subject<any>();
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;

    // создание продукта
    this.subscriptions.createItem = this.newItem.valueChanges
    .switchMap((product_id) => {
      if (this.isEdit) {
        return this.invoiceItemService.create({
          invoice_id: this.invoiceId,
          product_id: product_id,
          quantity: 1,
        })
        .take(1);
      }
      return Observable.of({product_id});
    })
    .subscribe(data => {
      this.addProduct(data);
      this.newItem.reset(null, {emitEvent: false});
    });

    // подсчет total
    this.subscriptions.setTotalPrice = Observable.combineLatest(
      this.items.valueChanges.startWith(this.items.value),
      this.discount.valueChanges.startWith(this.discount.value),
    )
    .map(([items, discount]) => {
      const price = items.reduce((accPrice, item) => {
        return accPrice + item.price;
      }, 0);
      return (price - (price / 100 * discount));
    })
    .subscribe((price) => {
      this.total.setValue(price);
    });

    // update invoice
    this.subscriptions.updateInvoice = Observable.merge(
      this.discount.valueChanges,
      this.customerId.valueChanges,
      this.total.valueChanges,
    )
    .filter(() => this.isEdit)
    .debounceTime(500)
    .skip(1)
    .distinctUntilChanged()
    .subscribe(res => {
      this.invoiceService.update(this.form.value);
    });

    // create invoice
    this.requestInvoice$ = this.saveForm$
    .switchMap(value => {
      return this.invoiceService.setInvoice(this.form.value);
    }).publishReplay(1);
    this.requestInvoice$.connect();

    this.subscriptions.addedInvoice = this.requestInvoice$
    .subscribe(res => {
      this.router.navigate(['/', 'invoice']);
    });

   this.isSuccessFullResponse$ = this.requestInvoice$
   .mapTo(true)
   .startWith(false);

   this.out$ = Observable
   .merge(
     this.isSuccessFullResponse$,
     this.checkModal$
   )
    .switchMap((isSuccessFullResponse) => {
      if (isSuccessFullResponse || this.isEdit) {
        return Observable.of(true);
      } else if ((this.form.touched || this.items.value.length)) {
          return this.modal.openModal('Warning', 'Are you sure that you want to leave without having survived?');
        }
        return Observable.of(true);
    })
    .delay(10)
    .publish();
   this.out$.connect();
  }

  ngOnDestroy() {
    this.subscriptions.createItem.unsubscribe();
    this.subscriptions.setTotalPrice.unsubscribe();
    this.subscriptions.addedInvoice.unsubscribe();
    this.subscriptions.updateInvoice.unsubscribe();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(null),
      customer_id: new FormControl('', [Validators.required]),
      items: new FormArray([], [Validators.required]),
      discount: new FormControl(0, [
        Validators.max(50),
        Validators.min(0),
      ]),
      total: new FormControl(0),
    });
    if (this.isEdit) {
      this.form.reset(this.route.snapshot.data.invoice);
      this.route.snapshot.data.invoiceItems.forEach(item => {
        this.addProduct(item);
      });
    }
  }

  addProduct(item) {
    this.items.push(
      new FormGroup({
        id: new FormControl(item.id || null),
        invoice_id: new FormControl(item.invoice_id || null),
        product_id: new FormControl(item.product_id, [Validators.required]),
        quantity: new FormControl(item.quantity || 1, [
          Validators.required,
          Validators.min(1)
        ]),
        price: new FormControl(0),
      })
    );
  }

  deleteItem(index) {
    this.items.removeAt(index);
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.checkModal$.complete();
    this.saveForm$.next(this.form.value);
  }
  canDeactivate() {
   this.checkModal$.next();
   return this.out$.take(1);
  }
}