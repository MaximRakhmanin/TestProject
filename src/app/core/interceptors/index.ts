import { HTTP_INTERCEPTORS} from '@angular/common/http';

import { SpinnerInterceptor } from './spinner-interceptor';
import { BaseUrlInterceptor } from './base-url-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
];
