import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';
import { ConnectableObservable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinner: Observable<boolean>;
  constructor(private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinner = this.spinnerService.status$;
  }
}
