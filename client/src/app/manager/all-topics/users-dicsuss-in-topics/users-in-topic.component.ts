import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import IUserService from '../../../user/interface/iuser.service';
import { User } from '../../../shared/entity/user';

@Component({
  selector: 'app-users-in-topic',
  templateUrl: './users-in-topic.component.html',
  styleUrls: ['./users-in-topic.component.css']
})
export class UsersInTopicComponent implements OnInit {
  @Input() topic;
  topicTitle: { value: string };

  constructor(@Inject('userService') private userService: IUserService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  onDeleteFromList(user: User) {
    console.log(user);
  }
}