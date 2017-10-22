import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import * as _ from 'underscore';

import { Topic } from "../../shared/entity/topic";
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";

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
    alert(_.isMatch(this.topic.allowedUsers, {'id': this.loggedUser.id}));
  }

  onCancel(): void {
  }

  onRefuse() {

  }

  allowedInTopic(): boolean {
    // _.any()
    if (!this.loggedUser) {
      return false;
    }
    alert(this.topic.allowedUsers.has(this.loggedUser));
    return this.topic.allowedUsers.has(this.loggedUser);
  }

}
