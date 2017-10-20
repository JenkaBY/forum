import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor(private injector: Injector) {}

  constructor(// @Inject('authenticationService') private authService: AuthenticationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    // const authService = this.injector.get(AuthenticationService);
    // const authHeader = this.authService.getAuthorizationHeader();
    // // Clone the request to add the new header.
    // const authReq = req.clone({
    //   setHeaders: {'Authorization': authHeader}
    // });
    // const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    // req.clone({
    //   setHeaders: {
    //     Authorization: authHeader
    //   }
    // });
    // Pass on the cloned request instead of the original request.
    return next.handle(req);
  }
}
