import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";

@Component({
  selector: 'forum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  isLangNavbarCollapsed = false;
  @Output() onSwitchLang = new EventEmitter<string>();
  loggedUser: User;
  currentUser$: Subscription;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.authService.changedCurrentUser
      .subscribe((user: User) => {
          this.loggedUser = user;
        },
        (err) => {
          console.log("Error in onInit in Header", err)
        });
    this.loggedUser = this.authService.getCurrentUser;
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe();
  }

  switchLang(lang: string) {
    this.onSwitchLang.emit(lang);
  }

  get currentUser(): User {
    return this.loggedUser;
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isUser() {
    return this.authService.isUser;
  }

  get isManager() {
    return this.authService.isManager;
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }
}
