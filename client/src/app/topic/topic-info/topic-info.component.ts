import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import * as _ from 'underscore';

import { Topic } from "../../shared/entity/topic";
import { AuthenticationService } from "../../authorization/authentication.service";
import ITopicDiscussRequestService from "../topic-disscuss-request/interface/itopic-discuss-request.service";
import { User } from "../../shared/entity/user";
import { UserRole } from "../../shared/entity/role";
import { Status, TopicDiscussRequest } from "../../shared/entity/topic-discuss-request";

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
  topicDiscussRequest: TopicDiscussRequest;

  constructor(private authService: AuthenticationService,
              @Inject('topicDiscussRequestService') private discussRequestService: ITopicDiscussRequestService) {
  }

  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.getCurrentUser;
    this.loadTopicDiscussRequest();
  }

  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
  }

  private loadTopicDiscussRequest() {
    if (!this.loggedUser) {
      return;
    }
    this.discussRequestService.getByTopicIdAndUserId(this.topic.id, this.loggedUser.id)
      .subscribe(
        ((discussRequest: TopicDiscussRequest) => {
          this.topicDiscussRequest = discussRequest;
          console.log("loaded DiscussRequest", discussRequest);
        }),
        (error => this.handleError(error))
      )
  }

  onSave(): void {
  }

  onDelete(): void {
  }

  onEdit(): void {
  }

  onCreateRequest(): void {
    // console.log('topic in createRequest', this.topic);
    // console.log('!this.loggedUser || this.topic.allowedUsers || this.topic.allowedUsers.size == 0', !this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.size == 0);
    if (!this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.size == 0) {
      // console.log('this.loggedUser', this.loggedUser);
      // console.log('this.topic.allowedUsers', !this.topic.allowedUsers);
      // console.log('this.topic.allowedUsers.size == 0', this.topic.allowedUsers.size == 0);
      return;
    }
    // alert(_.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id));
    let request = this.createTopicDiscussRequest();
    this.discussRequestService.createRequest(request)
      .subscribe(
        discussRequest => {
          this.topicDiscussRequest = discussRequest;
          console.log('created discussRequest', discussRequest);
        },
        error => {
          this.handleError(error);
        }
      )
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
    // console.log("canCreaterequest _.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id) >= 0", _.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id) >= 0);
    return _.indexOf(_.pluck(this.topic.allowedUsers, 'id'), this.loggedUser.id) >= 0;
  }

  canDelete(): boolean {
    if (!this.loggedUser) {
      console.log("canDelte Not Logined");
      return false;
    }
    // console.log("canDelete this.loggedUser.id == this.topic.createdBy.id", this.loggedUser.id == this.topic.createdBy.id);
    // console.log("canDelete this.loggedUser.role.title === UserRole.MANAGER", this.loggedUser.role.title === UserRole.MANAGER);
    // console.log("canDelete this.loggedUser.role.title", this.loggedUser.role.title);
    // console.log("canDelete UserRole.MANAGER", UserRole.MANAGER);
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
    // console.log("canCreaterequest !this.isAllowedInTopic()=", !this.isAllowedInTopic());
    // console.log("canCreaterequest this.loggedUser.role.title !== UserRole.MANAGER", this.loggedUser.role.title !== UserRole.MANAGER);
    return !this.isAllowedInTopic() && this.loggedUser.role.title !== UserRole.MANAGER;
  }

  private createTopicDiscussRequest(): TopicDiscussRequest {
    const request = new TopicDiscussRequest();
    request.inTopic = this.topic;
    request.status = Status.PENDING;
    request.requestedBy = this.loggedUser;
    request.createdAt = new Date();
    return request;
  }

  private handleError(error: any) {
    console.log(error);
  }
}