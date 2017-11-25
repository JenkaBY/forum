import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderConst } from './constants/constants';
import { ExtendedTranslationService } from './translation-service/extended-translation.service';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class LocaleInterceptor implements HttpInterceptor {

  constructor(@Inject(TranslateService) private translateService: ExtendedTranslationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone({
      headers: req.headers.set(
        HeaderConst.acceptLanguage,
        this.translateService.currentLang ? this.translateService.currentLang : this.translateService.getDefaultLang())
    });
    return next.handle(request);
  }
}
