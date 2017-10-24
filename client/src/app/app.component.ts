import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { AuthenticationService } from "./authorization/authentication.service";
import { Subscription } from "rxjs/Subscription";
import { User } from "./shared/entity/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAdminDashboardOpened = false;
  loggedUser: User;
  currentUserSubscr: Subscription;

  constructor(private router: Router,
              private translate: TranslateService,
              private authService: AuthenticationService) {
    translate.setDefaultLang('en');

    console.log('00 App Constructor');
  }

  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.getCurrentUser;
    console.log('01 App OnInit');
  }

  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
    console.log('02 App OnDestroy');
  }

  switchLanguage(lang: string): void {
    if (this.translate.currentLang === lang) return;
    this.translate.use(lang);
  }

  openAdminDashBoard(open: boolean): void {
    this.isAdminDashboardOpened = open;
  }

}
