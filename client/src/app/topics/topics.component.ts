import { Component, Inject, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import ITopicService from '../service/interface/itopic.service';
import { Topic } from '../model/topic';
import { Constants } from "../common/constants";
import { Page } from "../model/page";

@Component({
  selector: 'forum-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})

export class TopicsComponent implements OnInit {
  topics: Topic[];
  topic: Topic;
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;

  constructor(@Inject('topicService') private topicService: ITopicService) {
  }

  ngOnInit() {
    this.maxSize = Constants.getMaxSize();
    this.getAll(this.setUrlSearchParams());
    console.log("onInit " + JSON.stringify(this.setUrlSearchParams().toString()));
  }

  getAll(urlParams?: URLSearchParams): void {
    console.log("getAll " + JSON.stringify(urlParams));
    this.topicService.getAllTopics(urlParams)
      .then((page: Page<Topic>) => {
        this.setPageData(page);
        // console.log(JSON.stringify(page))
      })
      .catch(error => console.log(error));
  }

  private setUrlSearchParams(urlParams?: URLSearchParams): URLSearchParams {
    if (!urlParams) {
      urlParams = new URLSearchParams();
    }
    urlParams.append(Constants.getSortParam(), 'id');
    urlParams.append(Constants.getSizeParam(), String(Constants.getPageSize()));
    console.log("setURLsearchParams " + JSON.stringify(urlParams.toString()));
    return urlParams;
  }

  onPageChange() {
    const params = this.setUrlSearchParams();
    params.append(Constants.getPageParam(), String(this.currentPage - 1));
    console.log("onChangePage " + JSON.stringify(params.toString()));
    this.getAll(params);
  }

  private setPageData(page: Page<Topic>) {
    this.topics = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }
}
