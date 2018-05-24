import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash'

import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  spinner: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinner = this.spinnerService.status$;
  }
}
