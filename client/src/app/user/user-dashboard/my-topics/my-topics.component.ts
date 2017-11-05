import { Component, Inject, OnInit } from '@angular/core';

import { Pageable } from '../../../shared/entity/pageable';
import { Topic } from '../../../shared/entity/topic';
import ITopicService from '../../../topic/interface/itopic.service';

@Component({
  selector: 'app-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.css']
})
export class MyTopicsComponent extends Pageable<Topic> implements OnInit {

  constructor(@Inject('topicService') topicService: ITopicService) {
    super();
  }

  onPageChange() {
    this.pageSize = 10;
  }

  ngOnInit(): void {
  }

}
