import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/operator/toPromise';

import { Pageable } from '../../../shared/entity/pageable';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Page } from '../../../shared/entity/page';
import { TopicRequest } from '../../../shared/entity/topic-request';
import ITopicRequestService from '../../../topic/topic-request/interface/icreate-topic-request.service';
import { Status } from '../../../shared/entity/topic-discuss-request';
import { ApiConst } from '../../../shared/constants/routes.constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModifyCreateTopicRequestComponent } from './modify-create-topic-request/modify-create-topic-request.component';
import { ModalPrompt } from '../../../layout/modal-promt/modal-prompt.component';

@Component({
  selector: 'app-my-create-topic-requests',
  templateUrl: './my-create-topic-requests.component.html',
  styleUrls: ['./my-create-topic-requests.component.css']
})
export class MyCreateTopicRequestsComponent extends Pageable<TopicRequest> implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;

  constructor(@Inject('topicRequestService') private topicRequestService: ITopicRequestService,
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
        console.log('then close', _);
        this.topicRequestService.delete(topicReqest.id)
          .subscribe(
            (resp) => {
              console.log('deleted topicRequest', resp);
              this.onPageChange();
            },
            (error) => {
              this.handleError('observer error ' + error);
              this.onPageChange();
            });
      })
      .catch((error) => {
        this.handleError('catch modal ' + error);
      });
  }

  onEdit(topicRequest: TopicRequest): void {
    const modalRef = this.modalService.open(ModifyCreateTopicRequestComponent);
    modalRef.componentInstance.request = topicRequest;
    modalRef.result
      .then((modifiedRequest) => {
        console.log('modifiedRequest', modifiedRequest);
        this.topicRequestService.updateCreateTopicRequest(modifiedRequest)
          .subscribe(
          (topicRqst: TopicRequest) => {
            console.log('topicRqst', topicRqst);
          },
          (error) => this.handleError(error)
        );
      })
      .catch((error) => {
        this.handleError(error);
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
      .subscribe((page: Page<TopicRequest>) => {
          this.setPageData(page);
          this.handleError(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  private handleError(error: any) {
    console.log(error);
  }
}
