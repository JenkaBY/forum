import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GuardService } from '../../authorization/guard.service';

@Injectable()
export class UserProfileGuard implements CanActivate {

  constructor(@Inject('guardService') private guardService: GuardService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.guardService.isUser() || this.guardService.isAdmin() || this.guardService.isManager();
  }

}