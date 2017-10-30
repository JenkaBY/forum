import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

import { TopicRequest } from '../../shared/entity/topic-request';
import IManagerService from '../interface/imanager.service';
import { Page } from '../../shared/entity/page';
import { Constants } from '../../shared/constants/constants';

@Component({
  selector: 'app-create-topic-requests',
  templateUrl: './create-topic-requests.component.html',
  styleUrls: ['./create-topic-requests.component.css']
})
export class CreateTopicRequestsComponent implements OnInit {
  requests: TopicRequest[];
  currentPage: number;
  totalElements: number;
  pageSize = 20;
  maxSize: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              @Inject('managerService') private managerService: IManagerService) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.fetchAllPendingRequestsPerPage();
  }

  private fetchAllPendingRequestsPerPage(httpParams?: HttpParams) {
    this.managerService.getAllPendingCreateTopicRequests()
      .subscribe((page: Page<TopicRequest>) => {
          this.requests = page.content;
          this.currentPage = page.number + 1;
          this.totalElements = page.totalElements;
          this.pageSize = page.size;
          // console.log(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  onPageChange() {
    const params = new HttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    this.fetchAllPendingRequestsPerPage(params);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  private setPageData(page: Page<TopicRequest>) {
    this.requests = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  private setHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(this.pageSize));
    return httpParams;
  }
}
