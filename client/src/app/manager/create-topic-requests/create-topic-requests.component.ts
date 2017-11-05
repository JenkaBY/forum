import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TopicRequest } from '../../shared/entity/topic-request';
import IManagerService from '../interface/imanager.service';
import { Page } from '../../shared/entity/page';
import { Status } from '../../shared/entity/topic-discuss-request';
import { ModalRejectReasonComponent } from './modal-reject-reason/modal-reject-reason.component';
import { Pageable } from '../../shared/entity/pageable';

@Component({
  selector: 'app-create-topic-requests',
  templateUrl: './create-topic-requests.component.html',
  styleUrls: ['./create-topic-requests.component.css']
})
export class CreateTopicRequestsComponent extends Pageable<TopicRequest> implements OnInit {
  approving: boolean = false;
  rejecting: boolean = false;
  truncateSize = 150;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              @Inject('managerService') private managerService: IManagerService) {
    super();
    this.pageSize = 10;
  }

  ngOnInit() {
    this.currentPage = 1;
    this.fetchAllPendingRequestsPerPage(this.setHttpParams());
  }

  private fetchAllPendingRequestsPerPage(httpParams?: HttpParams) {
    this.managerService.getAllPendingCreateTopicRequests(httpParams)
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
    this.fetchAllPendingRequestsPerPage(this.setHttpParams(this.getHttpParams()));
  }

  private setStatusAndSaveTopicRequest(request: TopicRequest, status: string) {
    request.status = status;
    this.changeExecutingStatus(status);
    this.managerService.updateCreateTopicRequest(request)
      .subscribe((updatedRequest) => {
          this.onPageChange();
        this.changeExecutingStatus(status);
        }, (error) => {
          this.handleError(error);
        this.changeExecutingStatus(status);
        }
      );
  }

  private changeExecutingStatus(status: string) {
    if (status === Status.APPROVED) {
      this.approving = !this.approving;
    } else {
      this.rejecting = !this.rejecting;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
