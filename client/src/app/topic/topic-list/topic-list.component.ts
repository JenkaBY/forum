import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

import ITopicService from '../interface/itopic.service';
import { Topic } from '../../shared/entity/topic';
import { Constants } from "../../shared/constants/constants";
import { Page } from "../../shared/entity/page";

@Component({
  selector: 'forum-topics',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})

export class TopicListComponent implements OnInit {
  topics: Topic[];
  topic: Topic;
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;

  constructor(@Inject('topicService') private topicService: ITopicService) {
  }

  ngOnInit() {
    this.maxSize = Constants.getMaxSize;
    this.getAll(this.setHttpParams());
  }

  getAll(httpParams?: HttpParams): void {
    this.topicService.getAllTopics(httpParams)
      .subscribe(
        (page: Page<Topic>) => this.setPageData(page),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  private setHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(Constants.getPageSize));
    return httpParams;
  }

  onPageChange() {
    let params = this.setHttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    this.getAll(params);
  }

  private setPageData(page: Page<Topic>) {
    this.topics = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
