import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const transformUrl = req.clone({
      url: req.url.replace('', 'http://api.invoice-app.2muchcoffee.com/api')
    });
    return next.handle(transformUrl);
  }
}
