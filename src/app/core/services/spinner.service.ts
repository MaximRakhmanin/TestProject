import { Injectable } from '@angular/core';

import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/publish';

@Injectable()
export class SpinnerService {

  status$: ConnectableObservable<boolean>;
  spinnerSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.status$ = this.spinnerSubject
    .publish();
    this.status$.connect();
  }

  open() {
    this.spinnerSubject.next(true);
  }

  close() {
    this.spinnerSubject.next(false);
  }

}
