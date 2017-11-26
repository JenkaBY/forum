import { Component, Inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';
import 'rxjs/add/observable/forkJoin';

import { AuthenticationService } from './authorization/authentication.service';
import { User } from './shared/entity/user';
import { RoleService } from './shared/role/role.service';
import { Role } from './shared/entity/role';
import { StatusService } from './shared/status/status.service';
import { Status } from './shared/entity/status';
import { LanguageConst } from './shared/constants/constants';

/**
 * Describes main app selector
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAdminDashboardOpened = false;
  loggedUser: User;
  currentUserSubscr: Subscription;
  roles: Role[];
  statuses: Status[];
  public viewContainerRef: ViewContainerRef;

  constructor(private router: Router,
              private location: Location,
              private translate: TranslateService,
              private authService: AuthenticationService,
              @Inject('roleService') private roleService: RoleService,
              @Inject('statusService') private statusService: StatusService,
              public toastr: ToastsManager,
              viewContainerRef: ViewContainerRef) {
    translate.setDefaultLang(LanguageConst.en);
    translate.currentLang = LanguageConst.en;
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  /**
   * Implementation of OnInit interface. Subscribe on current user
   */
  ngOnInit(): void {
    const rolesObs = this.roleService.getRoles();
    const statusesObs = this.statusService.getStatuses();
    Observable.forkJoin(rolesObs, statusesObs)
      .subscribe(
        // result => {
        // this.roles = result[0];
        // this.statuses = result[1];
        // }
      );
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.tryAutoLogin();
    this.loggedUser = this.authService.getCurrentUser;
  }

  /**
   * Implementation of OnDestroy interface. Unsubscribe on current user
   */
  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
  }

  /**
   * Switch language
   * @param {string} lang language abbreviation ex. en, ru
   */
  switchLanguage(lang: string): void {
    if (this.translate.currentLang === lang) return;
    this.translate.use(lang);
  }

  openAdminDashBoard(open: boolean): void {
    this.isAdminDashboardOpened = open;
  }

  goBack() {
    this.location.back();
  }
}
