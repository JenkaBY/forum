import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { AuthenticationService } from "../authorization/authentication.service";
import { HeaderConst } from "../common/constants";

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
      //TODO remove next line
      console.log(HeaderConst.authorization, request.headers.get(HeaderConst.authorization));
    } else {
      request = req;
    }
    return next.handle(request);
  }
}
