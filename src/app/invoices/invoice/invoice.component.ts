import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
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
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';

import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { Invoice } from '../../models/invoice';

import { ModalService } from '../../core/services/modal.service';
import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;

  saveForm$: Subject<any> = new Subject<any>();
  form: FormGroup;
  addItemFormControl = new FormControl('', [Validators.required]);

  onCanDeactivate$ = new Subject<any>();
  permissionLeavePage$: ConnectableObservable<boolean>;
  isSuccessFullResponse$: Observable<boolean>;
  requestInvoice$: Observable<Invoice>;

  private subscriptions: {
    createItem?: Subscription;
    setTotalPrice?: Subscription;
    addedInvoice?: Subscription;
    updateInvoice?: Subscription;
  } = {};

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
  ) {}

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
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;

    // create item
    this.subscriptions.createItem = this.addItemFormControl.valueChanges
    .switchMap((product_id) => {
      if (this.isEdit) {
        return this.invoiceItemService.postItem({
          invoice_id: this.invoiceId,
          product_id: product_id,
          quantity: 1,
        })
        .take(1);
      }
      return Observable.of({product_id});
    })
    .subscribe(item => {
      this.items.push(this.createItemFormGroup(item));
      this.addItemFormControl.reset(null, {emitEvent: false});
    });

    // count total
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
    .subscribe(() => {
      this.invoiceService.updateInvoice(this.form.value);
    });

    // create invoice
    this.requestInvoice$ = this.saveForm$
    .switchMap(invoice => this.invoiceService.createInvoice(invoice))
    .shareReplay(1);

    this.subscriptions.addedInvoice = this.requestInvoice$
    .subscribe(() => this.router.navigate(['/', 'invoice']));

   this.isSuccessFullResponse$ = this.requestInvoice$
   .mapTo(true)
   .startWith(false);

   this.permissionLeavePage$ = Observable
   .merge(
     this.isSuccessFullResponse$,
     this.onCanDeactivate$
   )
    .switchMap((isSuccessFullResponse) => {
      if ((this.form.touched || this.items.value.length) && !(isSuccessFullResponse || this.isEdit)) {
          return this.modalService.openModal('Warning', 'Are you sure that you want to leave without having survived?');
        }
        return Observable.of(true);
    })
    .delay(10)
    .publish();
   this.permissionLeavePage$.connect();
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
      const formGroups = this.route.snapshot.data.invoiceItems.map(item => this.createItemFormGroup(item));
      const formArray = new FormArray(formGroups);
      this.form.setControl('items', formArray);
    }
  }

  createItemFormGroup(item) {
     return new FormGroup({
        id: new FormControl(item.id || null),
        invoice_id: new FormControl(item.invoice_id || null),
        product_id: new FormControl(item.product_id, [Validators.required]),
        quantity: new FormControl(item.quantity || 1, [
          Validators.required,
          Validators.min(1)
        ]),
        price: new FormControl(0),
      });
  }

  deleteItem(index) {
    this.items.removeAt(index);
  }

  save() {
    if (this.form.valid) {
      this.onCanDeactivate$.complete();
      this.saveForm$.next(this.form.value);
    }
  }

  canLeave() {
   this.onCanDeactivate$.next();
   return this.permissionLeavePage$.take(1);
  }
}
