import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../authorization/authentication.service';
import { HeaderConst } from './constants/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    let request;
    if (authService.currentUser) {
      const authHeader = authService.getAuthorizationHeader();
      request = req.clone({headers: req.headers.set(HeaderConst.authorization, authHeader)});
    } else {
      request = req;
    }
    return next.handle(request);
  }
}
