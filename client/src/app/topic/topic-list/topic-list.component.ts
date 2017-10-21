import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

import ITopicService from '../interface/itopic.service';
import { Topic } from '../../model/topic';
import { Constants } from "../../common/constants";
import { Page } from "../../model/page";

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
    console.log("onInit " + JSON.stringify(this.setHttpParams().toString()));
  }

  getAll(httpParams?: HttpParams): void {
    console.log("getAll " + JSON.stringify(httpParams));
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
    console.log("setHttpParams Topics", JSON.stringify(httpParams.toString()));
    return httpParams;
  }

  onPageChange() {
    let params = this.setHttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    console.log("onChangePage ", JSON.stringify(params.toString()));
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
