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

    console.log('loggedUser in const', this.loggedUser);
  }

  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
        console.log('0 loggedUser in onInit afterSubscribe', this.loggedUser);
      });
    console.log('1 loggedUser in onInit afterSubscribe', this.loggedUser);
    this.authService.getCurrentUser;
    console.log('2 loggedUser in onInit beforeSubscribe', this.loggedUser);
    this.authService.autoLogin();
    console.log('3 loggedUser in onInit afterLogin', this.loggedUser);
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
