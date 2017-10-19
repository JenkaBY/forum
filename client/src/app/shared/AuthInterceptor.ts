import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from "../authorization/authentication.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  // constructor(@Inject('authenticationService') private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const auth = this.injector.get(AuthenticationService);
    const authHeader = auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = //req.clone({headers: req.headers.set('Authorization', authHeader)});
      req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
