import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import IUserService from '../../../user/interface/iuser.service';
import ITopicService from '../../../topic/interface/itopic.service';
import { User } from '../../../shared/entity/user';
import { Topic } from '../../../shared/entity/topic';

@Component({
  selector: 'app-users-in-topic',
  templateUrl: './users-in-topic.component.html',
  styleUrls: ['./users-in-topic.component.css']
})
export class UsersInTopicComponent implements OnInit {
  @Input() topic: Topic;
  allowedUsers: User[] = [];
  deleting: boolean = false;
  error: boolean = false;

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              @Inject('topicService') private topicService: ITopicService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    if (this.topic.allowedUserIds.length > 0) {
      this.userService.getAllByIds(this.topic.allowedUserIds)
        .subscribe((users: User[]) => this.allowedUsers = users);
    }
  }

  onDeleteFromList(deletedUser: User) {
    this.deleting = true;
    const userIds = this.topic.allowedUserIds;
    const users = this.allowedUsers;
    this.topic.allowedUserIds = userIds.filter((id: number) => id !== deletedUser.id);
    this.topicService.update(this.topic)
      .subscribe(
        (topic: Topic) => {
          this.deleting = false;
          this.topic = topic;
          this.allowedUsers = users.filter((user: User) => user.id !== deletedUser.id);
        },
        (error) => {
          this.deleting = false;
          this.topic.allowedUserIds = userIds;
          this.error = true;
        });
  }

  closeAlert() {
    this.error = false;
  }
}