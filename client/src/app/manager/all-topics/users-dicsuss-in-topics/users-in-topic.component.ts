import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import IUserService from '../../../user/interface/iuser.service';
import ITopicService from '../../../topic/interface/itopic.service';
import { User } from '../../../shared/entity/user';
import { Topic } from '../../../shared/entity/topic';

/**
 * Describes the modal window with users allowed in topic
 */
@Component({
  selector: 'app-users-in-topic',
  templateUrl: './users-in-topic.component.html',
  styleUrls: ['./users-in-topic.component.css']
})
export class UsersInTopicComponent implements OnInit {
  @Input() topic: Topic;
  allowedUsers: User[] = [];
  deleting = false;
  error = false;

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              @Inject('topicService') private topicService: ITopicService,
              public activeModal: NgbActiveModal) {
  }

  /**
   * Implementation OnInit interface. Loads all users according to the list in UserIds
   */
  ngOnInit(): void {
    this.fetchAllowedUsersByIds();
  }

  private fetchAllowedUsersByIds() {
    if (this.topic.allowedUserIds.length > 0) {
      this.userService.getAllByIds(this.topic.allowedUserIds)
        .subscribe((users: User[]) => this.allowedUsers = users);
    }
  }

  /**
   * Send request and Delete user in allowed users list.
   * @param {User} deletedUser
   */
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

  /**
   * Event listener on close button. Closes alert.
   */
  closeAlert() {
    this.error = false;
  }
}