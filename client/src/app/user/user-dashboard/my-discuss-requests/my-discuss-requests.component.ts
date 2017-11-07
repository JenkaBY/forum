import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/operator/toPromise';

import { Pageable } from '../../../shared/entity/pageable';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Page } from '../../../shared/entity/page';
import { TopicRequest } from '../../../shared/entity/topic-request';
import ITopicRequestService from '../../../topic/topic-request/interface/icreate-topic-request.service';

@Component({
  selector: 'app-my-discuss-requests',
  templateUrl: './my-discuss-requests.component.html',
  styleUrls: ['./my-discuss-requests.component.css']
})
export class MyDiscussRequestsComponent extends Pageable<TopicRequest> implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;

  constructor(@Inject('topicRequestService') private topicRequestService: ITopicRequestService,
              private authService: AuthenticationService) {
    super();
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

  }

  onEdit(topicRequest: TopicRequest): void {

  }

  private fetchAllTopicRequestsOfCurrentUser() {
    this.topicRequestService.getAllRequestsByUserId(this.loggedUser.id, this.setHttpParams())
      .subscribe((page: Page<TopicRequest>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  private handleError(error: any) {
    console.log(error);
  }
}
