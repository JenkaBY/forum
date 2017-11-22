import { Component, Inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from './authorization/authentication.service';
import { User } from './shared/entity/user';
import { RoleService } from './shared/role/role.service';
import { Role } from './shared/entity/role';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';

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
  public viewContainerRef: ViewContainerRef;

  constructor(private router: Router,
              private location: Location,
              private translate: TranslateService,
              private authService: AuthenticationService,
              @Inject('roleService') roleService: RoleService,
              public toastr: ToastsManager,
              viewContainerRef: ViewContainerRef) {
    translate.setDefaultLang('en');
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
    // this.roles = roleService.getRoles();
  }

  /**
   * Implementation of OnInit interface. Subscribe on current user
   */
  ngOnInit(): void {
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
   * @param {string} lang language abbreviation ex. En, Ru
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
