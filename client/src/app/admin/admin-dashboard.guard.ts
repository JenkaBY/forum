import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GuardService } from '../authorization/guard.service';

@Injectable()
export class AdminDashboardGuard implements CanActivate, CanActivateChild {

  constructor(@Inject('guardService') private guardService: GuardService) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.guardService.isAdmin() && !this.guardService.isBlocked();
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.guardService.isAdmin() && !this.guardService.isBlocked();
  }
}
