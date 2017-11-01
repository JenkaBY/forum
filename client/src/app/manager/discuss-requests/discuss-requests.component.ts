import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Page } from '../../shared/entity/page';
import { Status, TopicDiscussRequest } from '../../shared/entity/topic-discuss-request';
import { Pageable } from '../../shared/entity/pageable';
import ITopicDiscussRequestService from '../../topic/topic-disscuss-request/interface/itopic-discuss-request.service';

@Component({
  selector: 'app-discuss-requests',
  templateUrl: './discuss-requests.component.html',
  styleUrls: ['./discuss-requests.component.css']
})
export class DiscussRequestsComponent extends Pageable<TopicDiscussRequest> implements OnInit {
  approving: boolean = false;
  rejecting: boolean = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              @Inject('topicDiscussRequestService') private discussRequestService: ITopicDiscussRequestService) {
    super();
  }

  ngOnInit() {
    this.currentPage = 1;
    this.getAllPendingRequestsPerPage();
  }

  private getAllPendingRequestsPerPage(httpParams?: HttpParams) {
    this.discussRequestService.getAllPending(httpParams)
      .subscribe((page: Page<TopicDiscussRequest>) => {
          console.log('page', page);
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  onApprove(request: TopicDiscussRequest): void {
    this.setStatusAndSaveDiscussRequest(request, Status.APPROVED);
  }

  onReject(request: TopicDiscussRequest): void {
    this.setStatusAndSaveDiscussRequest(request, Status.REJECTED);
  }

  onPageChange() {
    this.getAllPendingRequestsPerPage(this.getHttpParams());
  }

  private setStatusAndSaveDiscussRequest(request: TopicDiscussRequest, status: string) {
    request.status = status;
    this.discussRequestService.updateRequest(request)
      .subscribe((updatedRequest) => {
          console.log('setStatusAndSave', updatedRequest);
          this.onPageChange();
        }, (error) => {
          this.handleError(error);
        }
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  // private setPageData(page: Page<TopicRequest>) {
  //   this.requests = page.content;
  //   this.currentPage = page.number + 1;
  //   this.totalElements = page.totalElements;
  //   this.pageSize = page.size;
  // }
  //
  // private setHttpParams(httpParams?: HttpParams): HttpParams {
  //   if (!httpParams) {
  //     httpParams = new HttpParams();
  //   }
  //   httpParams = httpParams.set(Constants.getSortParam, Constants.id)
  //     .set(Constants.getSizeParam, String(this.pageSize));
  //   return httpParams;
  // }
}
