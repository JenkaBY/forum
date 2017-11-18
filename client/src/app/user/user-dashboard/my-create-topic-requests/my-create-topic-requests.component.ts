import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/operator/toPromise';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';

import { Pageable } from '../../../shared/entity/pageable';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Page } from '../../../shared/entity/page';
import { TopicRequest } from '../../../shared/entity/topic-request';
import ITopicRequestService from '../../../topic/topic-request/interface/icreate-topic-request.service';
import { Status } from '../../../shared/entity/topic-discuss-request';
import { ApiConst } from '../../../shared/constants/routes.constants';
import { ModifyCreateTopicRequestComponent } from './modify-create-topic-request/modify-create-topic-request.component';
import { ModalPrompt } from '../../../layout/modal-promt/modal-prompt.component';
import { ExtendedTranslationService } from '../../../shared/translation-service/extended-translation.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-my-create-topic-requests',
  templateUrl: './my-create-topic-requests.component.html',
  styleUrls: ['./my-create-topic-requests.component.css']
})
export class MyCreateTopicRequestsComponent extends Pageable<TopicRequest> implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;

  constructor(@Inject('topicRequestService') private topicRequestService: ITopicRequestService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private authService: AuthenticationService,
              private modalService: NgbModal,
              private router: Router) {
    super();
    this.sortColumn = 'CreatedAt,DESC';
  }

  onPageChange() {
    this.fetchAllTopicRequestsOfCurrentUser();
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.authService.getCurrentUser;
    this.fetchAllTopicRequestsOfCurrentUser();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  onDelete(topicReqest: TopicRequest): void {
    const modalRef = this.modalService.open(ModalPrompt);
    modalRef.result
      .then((_) => {
        this.topicRequestService.delete(topicReqest.id)
          .subscribe(
            (resp) => {
              this.notifySuccess('deleted');
              this.onPageChange();
            },
            (error) => {
              this.handleError(error);
              this.onPageChange();
            });
      })
      .catch((error) => {
        //do nothing. Close window.
      });
  }

  onEdit(topicRequest: TopicRequest): void {
    const modalRef = this.modalService.open(ModifyCreateTopicRequestComponent);
    modalRef.componentInstance.request = topicRequest;
    modalRef.result
      .then((modifiedRequest) => {
        this.topicRequestService.updateCreateTopicRequest(modifiedRequest)
          .subscribe(
            (topicRqst: TopicRequest) => {
              this.notifySuccess('updated');
            },
            (error) => this.handleError(error)
          );
      })
      .catch((error) => {
        //do nothing. Close window.
      });
  }

  onGoToTopic(topicRequest: TopicRequest) {
    this.router.navigate([ApiConst.topic, String(topicRequest.createdTopic.id)]);
  }

  isApproved(topicRequest: TopicRequest): boolean {
    return topicRequest.status === Status.APPROVED;
  }

  isPending(topicRequest: TopicRequest): boolean {
    return topicRequest.status === Status.PENDING;
  }

  private fetchAllTopicRequestsOfCurrentUser() {
    this.topicRequestService.getAllRequestsByUserId(this.loggedUser.id, this.getHttpParams())
      .subscribe(
        (page: Page<TopicRequest>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  private handleError(error: any) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  private notifySuccess(action: string) {
    const translatedStatus = this.translateService.getTranslate('ACTIONS.' + action.toUpperCase());
    this.toastr.success(
      this.translateService.getTranslate(
        'MESSAGES.CREATE_TOPIC_REQUEST_CHANGED', {status: translatedStatus}
      )
    );
  }
}
