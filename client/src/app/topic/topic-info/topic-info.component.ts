import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import * as _ from 'underscore';

import { Topic } from "../../shared/entity/topic";
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";
import { UserRole } from "../../shared/entity/role";

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrls: ['./topic-info.component.css']
})
export class TopicInfoComponent implements OnInit, OnDestroy {
  @Input() topic: Topic;
  saving = false;
  caneling = false;
  editing = false;
  deleteng = false;
  loggedUser: User;
  currentUserSubscr: Subscription;
  requesting: boolean;
  refusing: boolean;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.getCurrentUser;
    this.authService.autoLogin();
    // this.allowedInTopic();
  }

  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
  }

  onSave(): void {
  }

  onDelete(): void {
  }

  onEdit(): void {
  }

  onCreateRequest(): void {
    console.log('topic in createRequest', this.topic);
    console.log('!this.loggedUser || this.topic.allowedUsers || this.topic.allowedUsers.size == 0', !this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.size == 0);
    if (!this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.size == 0) {
      console.log('this.loggedUser', this.loggedUser);
      console.log('this.topic.allowedUsers', !this.topic.allowedUsers);
      console.log('this.topic.allowedUsers.size == 0', this.topic.allowedUsers.size == 0);
      return;
    }
    alert(_.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id));
  }

  onCancel(): void {
  }

  onRefuse() {

  }

  isAllowedInTopic(): boolean {
    if (!this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.size == 0) {
      console.log("isAllowed Not Logined");
      return false;
    }
    console.log("canCreaterequest _.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id) >= 0", _.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id) >= 0);
    return _.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id) >= 0;
  }

  canDelete(): boolean {
    if (!this.loggedUser) {
      console.log("canDelte Not Logined");
      return false;
    }
    console.log("canDelete this.loggedUser.id == this.topic.createdBy.id", this.loggedUser.id == this.topic.createdBy.id);
    console.log("canDelete this.loggedUser.role.title === UserRole.MANAGER", this.loggedUser.role.title === UserRole.MANAGER);
    console.log("canDelete this.loggedUser.role.title", this.loggedUser.role.title);
    console.log("canDelete UserRole.MANAGER", UserRole.MANAGER);
    return this.loggedUser.id == this.topic.createdBy.id || this.loggedUser.role.title === UserRole.MANAGER;
  }

  canEdit(): boolean {
    return this.canDelete();
  }

  canCreateRequest(): boolean {
    if (!this.loggedUser) {
      console.log("canCreaterequest Not Logined");
      return false;
    }
    console.log("canCreaterequest !this.isAllowedInTopic()=", !this.isAllowedInTopic());
    console.log("canCreaterequest this.loggedUser.role.title !== UserRole.MANAGER", this.loggedUser.role.title !== UserRole.MANAGER);
    return !this.isAllowedInTopic() && this.loggedUser.role.title !== UserRole.MANAGER;
  }
}
