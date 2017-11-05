import { Component, Inject, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Pageable } from '../../shared/entity/pageable';
import { Topic } from '../../shared/entity/topic';
import ITopicService from '../../topic/interface/itopic.service';
import { Page } from '../../shared/entity/page';
import { UsersInTopicComponent } from './users-dicsuss-in-topics/users-in-topic.component';

@Component({
  selector: 'app-manager-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent extends Pageable<Topic> implements OnInit {

  constructor(@Inject('topicService') private topicService: ITopicService,
              private modalService: NgbModal) {
    super();
    this.pageSize = 10;
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.getAllTopics(this.setHttpParams());
  }

  private getAllTopics(httpParams?: HttpParams) {
    this.topicService.getAllTopics(httpParams)
      .subscribe(
        (page: Page<Topic>) => {
          this.setPageData(page);
        },
        (error) => this.handleError(error)
      );
  }

  onPageChange() {
    this.getAllTopics(this.setHttpParams(this.getHttpParams()));
  }

  private handleError(error: any) {
    console.log(error);
  }

  onShowUsers(topic: Topic) {
    const modalRef = this.modalService.open(UsersInTopicComponent);
    modalRef.componentInstance.topic = topic;
    modalRef.result
      .then((result) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
}