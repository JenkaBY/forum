import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import ITopicService from '../interface/itopic.service';
import { Topic } from '../../shared/entity/topic';
import { Page } from '../../shared/entity/page';
import { Pageable } from '../../shared/entity/pageable';

@Component({
  selector: 'forum-topics',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})

export class TopicListComponent extends Pageable<Topic> implements OnInit {

  constructor(@Inject('topicService') private topicService: ITopicService) {
    super();
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.topicService.getAllTopics(this.getHttpParams())
      .subscribe(
        (page: Page<Topic>) => {
          this.setPageData(page);
        },
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  onPageChange() {
    this.getAll();
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
