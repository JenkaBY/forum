import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { AuthenticationService } from './authorization/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './shared/entity/user';
import { RoleService } from './shared/role/role.service';
import { Role } from './shared/entity/role';

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

  constructor(private router: Router,
              private translate: TranslateService,
              private authService: AuthenticationService,
              @Inject('roleService') roleService: RoleService) {
    translate.setDefaultLang('en');
      // this.roles = roleService.getRoles();
  }

  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.getCurrentUser;
  }

  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
  }

  switchLanguage(lang: string): void {
    if (this.translate.currentLang === lang) return;
    this.translate.use(lang);
  }

  openAdminDashBoard(open: boolean): void {
    this.isAdminDashboardOpened = open;
  }
}
