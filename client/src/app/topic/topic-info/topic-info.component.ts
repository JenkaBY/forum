import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Topic } from '../../shared/entity/topic';
import { AuthenticationService } from '../../authorization/authentication.service';
import ITopicDiscussRequestService from '../topic-disscuss-request/interface/itopic-discuss-request.service';
import { User } from '../../shared/entity/user';
import { UserRole } from '../../shared/entity/role';
import { Status, TopicDiscussRequest } from '../../shared/entity/topic-discuss-request';
import { isInArray } from '../../shared/utilities';
import { Constants } from '../../shared/constants/constants';
import { ModalTopicContentComponent } from '../edit-topic/modal-content/modal-topic-content.component';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrls: ['./topic-info.component.css']
})
export class TopicInfoComponent implements OnInit, OnDestroy {
  @Input() topic: Topic;
  saving = false;
  canceling = false;
  editing = false;
  deleting = false;
  loggedUser: User;
  currentUserSubscr: Subscription;
  requesting: boolean;
  refusing: boolean;
  topicDiscussRequest: TopicDiscussRequest;

  constructor(private authService: AuthenticationService,
              @Inject('topicDiscussRequestService') private discussRequestService: ITopicDiscussRequestService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.loggedUser = this.authService.getCurrentUser;
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
        }),
        (error => this.handleError(error))
      );
  }

  onSave(): void {
  }

  onDelete(): void {
  }

  onEdit(): void {
    const modalRef = this.modalService.open(ModalTopicContentComponent, {size: "lg"});
    modalRef.componentInstance.topic = this.topic;
  }

  onCreateRequest(): void {
    if (!this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.length === 0) {
      return;
    }
    let request = this.createTopicDiscussRequest();
    this.discussRequestService.createRequest(request)
      .subscribe(
        discussRequest => {
          this.topicDiscussRequest = discussRequest;
        },
        error => {
          this.handleError(error);
        }
      );
  }

  onCancel(): void {
  }

  onRefuse() {

  }

  isAllowedInTopic(): boolean {
    if (!this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.length == 0) {
      return false;
    }
    return isInArray(this.topic.allowedUsers, Constants.id, this.loggedUser.id);
  }

  canDelete(): boolean {
    if (!this.loggedUser) {
      return false;
    }
    return this.loggedUser.id == this.topic.createdBy.id || this.loggedUser.role.title === UserRole.MANAGER;
  }

  canEdit(): boolean {
    return this.canDelete();
  }

  canCreateRequest(): boolean {
    if (!this.loggedUser) {
      return false;
    }
    return !this.isAllowedInTopic() && this.authService.isUser;
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
