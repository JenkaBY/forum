import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TopicRequest } from '../../shared/entity/topic-request';
import IManagerService from '../interface/imanager.service';
import { Page } from '../../shared/entity/page';
import { Constants } from '../../shared/constants/constants';
import { Status } from '../../shared/entity/topic-discuss-request';
import { ModalRejectReasonComponent } from './modal-reject-reason/modal-reject-reason.component';

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
  approving: boolean = false;
  rejecting: boolean = false;
  truncateSize = 150;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              @Inject('managerService') private managerService: IManagerService) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.fetchAllPendingRequestsPerPage();
  }

  private fetchAllPendingRequestsPerPage(httpParams?: HttpParams) {
    this.managerService.getAllPendingCreateTopicRequests()
      .subscribe((page: Page<TopicRequest>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  onApprove(request: TopicRequest): void {
    this.setStatusAndSaveTopicRequest(request, Status.APPROVED);
  }

  onReject(request: TopicRequest): void {
    const modalRef = this.modalService.open(ModalRejectReasonComponent);
    modalRef.componentInstance.request = request;
    modalRef.result
      .then((requestWithReason) => {
        this.setStatusAndSaveTopicRequest(requestWithReason, Status.REJECTED);
      })
      .catch((error) => {
      });
  }

  onPageChange() {
    const params = new HttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    this.fetchAllPendingRequestsPerPage(params);
  }

  private setStatusAndSaveTopicRequest(request: TopicRequest, status: string) {
    request.status = status;
    this.managerService.updateCreateTopicRequest(request)
      .subscribe((updatedRequest) => {
          this.onPageChange();
        }, (error) => {
          this.handleError(error);
        }
      );
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
