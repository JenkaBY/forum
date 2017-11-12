import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GuardService } from '../authorization/guard.service';

@Injectable()
export class ManagerDashboardGuard implements CanActivate, CanActivateChild {
  constructor(@Inject('guardService') private guardService: GuardService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.guardService.isManager() && !this.guardService.isBlocked();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.guardService.isManager() && !this.guardService.isBlocked();
  }
}
