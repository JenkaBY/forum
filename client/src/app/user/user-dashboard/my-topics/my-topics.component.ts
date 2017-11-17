import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/operator/toPromise';

import { Pageable } from '../../../shared/entity/pageable';
import { Topic } from '../../../shared/entity/topic';
import ITopicService from '../../../topic/interface/itopic.service';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Page } from '../../../shared/entity/page';

@Component({
  selector: 'app-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.css']
})
export class MyTopicsComponent extends Pageable<Topic> implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;

  constructor(@Inject('topicService') private topicService: ITopicService,
              private authService: AuthenticationService) {
    super();
  }

  onPageChange() {
    this.fetchAllTopicsOfCurrentUser();
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.authService.getCurrentUser;
    this.fetchAllTopicsOfCurrentUser();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  private fetchAllTopicsOfCurrentUser() {
    this.topicService.getAllTopicsCreatedByOrDiscussedUser(this.loggedUser.id, this.getHttpParams())
      .subscribe((page: Page<Topic>) => {
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
