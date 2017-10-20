import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { AuthenticationService } from "../authorization/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  // constructor( @Inject('authenticationService') private authService: AuthenticationService
  // ) {
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authService = this.injector.get(AuthenticationService);
    let request;
    if (authService.currentUser) {
      const authHeader = authService.getAuthorizationHeader();
      request = req.clone({headers: req.headers.set('Authorization', authHeader)});
      req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
      console.log('Authorization', request.headers.get('Authorization'));
    } else {
      request = req;
    }

    // // Clone the request to add the new header.
    // const authReq = req.clone({
    //   setHeaders: {'Authorization': authHeader}
    // });
    // Pass on the cloned request instead of the original request.
    return next.handle(request);
  }
}
