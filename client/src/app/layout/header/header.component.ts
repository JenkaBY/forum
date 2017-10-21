import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";

@Component({
  selector: 'forum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  isLangNavbarCollapsed = false;
  @Output() onSwitchLang = new EventEmitter<string>();


  constructor(private authService: AuthenticationService) {
  }

  switchLang(lang: string) {
    this.onSwitchLang.emit(lang);
  }

  get currentUser(): User {
    return this.authService.currentUser;
  }

  onSignOut() {
    this.authService.logout();
  }
}
