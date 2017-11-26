import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Topic } from '../../shared/entity/topic';
import { AuthenticationService } from '../../authorization/authentication.service';
import ITopicDiscussRequestService from '../topic-disscuss-request/interface/itopic-discuss-request.service';
import { User } from '../../shared/entity/user';
import { TopicDiscussRequest } from '../../shared/entity/topic-discuss-request';
import { ModalTopicContentComponent } from '../edit-topic/modal-content/modal-topic-content.component';
import { GuardService } from '../../authorization/guard.service';
import IStatusService from '../../shared/status/istatus.service';
import { environment } from '../../../environments/environment';
import { ToastsManager } from 'ng2-toastr';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { TranslateService } from 'ng2-translate';

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
              @Inject('statusService') private statusService: IStatusService,
              @Inject('guardService') private guardService: GuardService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
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
          console.log(discussRequest);
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

  isAllowedInTopic(): boolean {
    return this.guardService.canCreateMsgInTopic(this.topic);
  }

  canDelete(): boolean {
    return this.guardService.canDeleteTopic(this.topic);
  }

  canEdit(): boolean {
    return this.guardService.canEditTopic(this.topic);
  }

  canCreateRequest(): boolean {
    return this.guardService.canCreateTopicDiscussRequest(this.topic);
  }

  private createTopicDiscussRequest(): TopicDiscussRequest {
    const request = new TopicDiscussRequest();
    request.inTopic = this.topic;
    request.status = this.statusService.getPendingStatus();
    request.requestedBy = this.loggedUser;
    request.createdAt = new Date();
    return request;
  }

  private handleError(error: any) {
    if (!environment.production) {
      console.log(error);
    }
    if (error.error && error.error.message) {
      this.toastr.error(error.error.message);
      return;
    }
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
  }
}
