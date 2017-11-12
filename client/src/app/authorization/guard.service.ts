import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from '../shared/entity/user';
import { Subscription } from 'rxjs/Subscription';
import { RoleConst } from '../shared/constants/constants';
import { Topic } from '../shared/entity/topic';
import { Message } from '../shared/entity/message';

@Injectable()
export class GuardService {
  private loggedUser: User;
  private currentUserSubscription: Subscription;

  constructor(private authService: AuthenticationService) {
    this.currentUserSubscription = authService.changedCurrentUser.subscribe(
      (user: User) => {
        this.loggedUser = user;
      }
    );
    this.loggedUser = this.authService.getCurrentUser;
  }

  isManager(): boolean {
    if (!this.loggedUser) {
      return false;
    }
    return this.loggedUser.role.title === RoleConst.MANAGER;
  }

  isAdmin(): boolean {
    if (!this.loggedUser) {
      return false;
    }
    return this.loggedUser.role.title === RoleConst.ADMIN;
  }

  isUser(): boolean {
    if (!this.loggedUser) {
      return false;
    }
    return this.loggedUser.role.title === RoleConst.USER;
  }

  isUserOrManager(): boolean {
    return this.isManager() || this.isUser();
  }

  isBlocked(): boolean {
    if (!this.loggedUser) {
      return true;
    }
    return this.loggedUser.blocked;
  }

  isRejected(): boolean {
    if (!this.loggedUser) {
      return true;
    }
    return this.loggedUser.rejected;
  }

  canCreateMsgInTopic(topic: Topic): boolean {
    if (this.isUserOrManager() && !this.isBlocked() && !this.isRejected()) {
      return topic.allowedUserIds.indexOf(this.loggedUser.id) >= 0
        || topic.createdById === this.loggedUser.id
        || this.isManager();
    }
    return false;
  }

  canEditTopic(topic: Topic): boolean {
    if (this.isUserOrManager() && !this.isBlocked() && !this.isRejected()) {
      return this.isManager() || topic.createdById === this.loggedUser.id;
    }
    return false;
  }

  canEditMsg(message: Message): boolean {
    if (this.isUserOrManager() && !this.isRejected()) {
      return this.isManager() || message.createdBy.id === this.loggedUser.id;
    }
    return false;
  }

  canCreateTopicRequest(): boolean {
    return this.isUser();
  }

  canCreateTopicDiscussRequest(topic: Topic): boolean {
    return this.isUser()
      && !this.isBlocked()
      && !this.isRejected()
      && this.loggedUser.id !== topic.createdById
      && topic.allowedUserIds.indexOf(this.loggedUser.id) < 0;
  }

  canDeleteMsg(message: Message): boolean {
    return this.canEditMsg(message);
  }

  canDeleteTopic(topic: Topic): boolean {
    return this.canEditTopic(topic);
  }

  canDeleteUser(user: User): boolean {
    // console.log('CAN DELETE user id', user.id, 'logged id', this.loggedUser.id);
    // console.log('CAN DELETE user id', user.id, 'isBlocked', this.isBlocked());
    // console.log('CAN DELETE user id', user.id, 'user Role', user.role.title);
    // console.log('CAN DELETE user id', user.id, 'isAdmin', this.isAdmin());
    return this.isAdmin()
      && !this.isBlocked()
      && this.loggedUser.id !== user.id
      && user.role.title !== RoleConst.SYSTEM;
  }

  canEditUser(user: User): boolean {
    return this.canDeleteUser(user);
  }
}