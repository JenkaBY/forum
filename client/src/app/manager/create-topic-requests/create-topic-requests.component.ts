import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TopicRequest } from '../../shared/entity/topic-request';
import { Page } from '../../shared/entity/page';
import { ModalRejectReasonComponent } from './modal-reject-reason/modal-reject-reason.component';
import { Pageable } from '../../shared/entity/pageable';
import ITopicRequestService from '../../topic/topic-request/interface/icreate-topic-request.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { environment } from '../../../environments/environment';
import { Status } from '../../shared/entity/status';
import IStatusService from '../../shared/status/istatus.service';
import { StatusConst } from '../../shared/entity/topic-discuss-request';

/**
 * Describes the create topic requests in ManagerDashboard.
 */
@Component({
  selector: 'app-create-topic-requests',
  templateUrl: './create-topic-requests.component.html',
  styleUrls: ['./create-topic-requests.component.css']
})
export class CreateTopicRequestsComponent extends Pageable<TopicRequest> implements OnInit {
  approving: boolean = false;
  rejecting: boolean = false;

  constructor(private modalService: NgbModal,
              @Inject('topicRequestService') private topicRequestService: ITopicRequestService,
              @Inject('statusService') private statusService: IStatusService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager) {
    super();
    this.pageSize = 10;
  }

  /**
   * Implementation of the OnInit interface
   */
  ngOnInit() {
    this.fetchAllPendingRequestsPerPage();
  }

  private fetchAllPendingRequestsPerPage() {
    this.topicRequestService.getAllPendingCreateTopicRequests(this.getHttpParams())
      .subscribe((page: Page<TopicRequest>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  /**
   * Event Listener on 'Approve' Button. Approves Create Topic request.
   * @param {TopicRequest} request to be approved
   */
  onApprove(request: TopicRequest): void {
    this.setStatusAndSaveTopicRequest(request, this.statusService.getApprovedStatus());
  }

  /**
   * Event Listener on 'Reject' Button. Opens modal window with needs specify rejection reason. Rejects Create Topic request.
   * @param {TopicRequest} request to be rejected
   */
  onReject(request: TopicRequest): void {
    const modalRef = this.modalService.open(ModalRejectReasonComponent);
    modalRef.componentInstance.request = request;
    modalRef.result
      .then((requestWithReason) => {
        this.setStatusAndSaveTopicRequest(requestWithReason, this.statusService.getRejectedStatus());
      })
      .catch((error) => {
      });
  }

  /**
   * Event listner on 'page number' button. Fetches all pending requests per page
   */
  onPageChange() {
    this.fetchAllPendingRequestsPerPage();
  }

  private setStatusAndSaveTopicRequest(request: TopicRequest, status: Status) {
    request.status = status;
    this.changeExecutingStatus(status.title);
    this.topicRequestService.updateCreateTopicRequest(request)
      .subscribe((updatedRequest) => {
          this.onPageChange();
        this.notifySuccessUpdateStatus(status.title);
        this.changeExecutingStatus(status.title);
        }, (error) => {
          this.handleError(error);
        this.changeExecutingStatus(status.title);
        }
      );
  }

  private changeExecutingStatus(status: string) {
    if (status === StatusConst.APPROVED) {
      this.approving = !this.approving;
    } else {
      this.rejecting = !this.rejecting;
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  private notifySuccessUpdateStatus(status: string) {
    const translatedStatus = this.translateService.getTranslate('STATUS.' + status);
    this.toastr.success(
      this.translateService.getTranslate(
        'MESSAGES.CREATE_TOPIC_REQUEST_CHANGED', {status: translatedStatus}
      )
    );
  }

  private getStatusTranslationStr(status: string): string {
    return `STATUS.${status}`;
  }
}
