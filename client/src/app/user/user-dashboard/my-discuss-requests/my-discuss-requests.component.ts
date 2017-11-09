import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/operator/toPromise';

import { Pageable } from '../../../shared/entity/pageable';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Page } from '../../../shared/entity/page';
import ITopicDiscussRequestService from '../../../topic/topic-disscuss-request/interface/itopic-discuss-request.service';
import { TopicDiscussRequest } from '../../../shared/entity/topic-discuss-request';

@Component({
  selector: 'app-my-discuss-requests',
  templateUrl: './my-discuss-requests.component.html',
  styleUrls: ['./my-discuss-requests.component.css']
})
export class MyDiscussRequestsComponent extends Pageable<TopicDiscussRequest> implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;

  constructor(@Inject('topicDiscussRequestService') private discussRequestService: ITopicDiscussRequestService,
              private authService: AuthenticationService) {
    super();
    this.sortColumn = 'id,DESC';
  }

  onPageChange() {
    this.fetchAllDiscussRequestsOfCurrentUser();
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.authService.getCurrentUser;
    this.fetchAllDiscussRequestsOfCurrentUser();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  onDelete(discussReqest: TopicDiscussRequest): void {
    this.discussRequestService.deleteDiscussRequest(discussReqest)
      .subscribe((response) => {
          console.log(response);
          this.onPageChange();
        },
        (error) => {
          this.handleError(error);
          this.onPageChange();
        });
  }

  private fetchAllDiscussRequestsOfCurrentUser() {
    this.discussRequestService.getAllRequestsByUserId(this.loggedUser.id, this.setHttpParams())
      .subscribe((page: Page<TopicDiscussRequest>) => {
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
