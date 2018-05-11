import { HTTP_INTERCEPTORS} from '@angular/common/http';

import {UrlInterceptor} from './url-interceptor';
import { SpinnerInterceptor } from './spinner-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
];
