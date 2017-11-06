import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/operator/toPromise';

import { Pageable } from '../../../shared/entity/pageable';
import { Topic } from '../../../shared/entity/topic';
import ITopicService from '../../../topic/interface/itopic.service';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';

@Component({
  selector: 'app-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.css']
})
export class MyTopicsComponent extends Pageable<Topic> implements OnInit {
  currentUserSubscription: Subscription;
  loggedUser: User;
  topics: Topic[];

  constructor(@Inject('topicService') private topicService: ITopicService,
              private authService: AuthenticationService) {
    super();
  }

  onPageChange() {
    this.pageSize = 10;
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    // .toPromise()
    // .then((user: User) => this.loggedUser = user)
    // .then(() => {});
    // .subscribe();
    this.authService.getCurrentUser;
    // this.topicService.getAllTopicsCreatedByOrDiscussedUser()
  }

  private fetchAllTopicsOfCurrentUser() {

  }
}
