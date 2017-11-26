import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../authorization/authentication.service';
import { User } from '../../shared/entity/user';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { GuardService } from '../../authorization/guard.service';
import { RoutesConst } from '../../shared/constants/routes.constants';

@Component({
  selector: 'forum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  @Output() onSwitchLang = new EventEmitter<string>();
  loggedUser: User;
  currentUser$: Subscription;

  constructor(private authService: AuthenticationService,
              @Inject('guardService') private guardService: GuardService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.authService.changedCurrentUser
      .subscribe((user: User) => {
          this.loggedUser = user;
        },
        (err) => {
          //Do nothing
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
    return this.guardService.isUser();
  }

  get canCreateTopicRequest() {
    return this.guardService.canCreateTopicRequest();
  }

  get isManager() {
    return this.guardService.isManager();
  }

  get isAdmin() {
    return this.guardService.isAdmin();
  }

  onGoToProfile() {
    this.router.navigate([RoutesConst.user, RoutesConst.PROFILE]);
  }

  onChangePassword() {
    this.router.navigate([RoutesConst.user, RoutesConst.changePassword]);
  }
}
