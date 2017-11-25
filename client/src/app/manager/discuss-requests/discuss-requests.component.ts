import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Page } from '../../shared/entity/page';
import { StatusConst, TopicDiscussRequest } from '../../shared/entity/topic-discuss-request';
import { Pageable } from '../../shared/entity/pageable';
import ITopicDiscussRequestService from '../../topic/topic-disscuss-request/interface/itopic-discuss-request.service';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { ToastsManager } from 'ng2-toastr';
import { environment } from '../../../environments/environment';
import IStatusService from '../../shared/status/istatus.service';
import { Status } from '../../shared/entity/status';

/**
 * Describes manager dashboard panel with users topic discuss requests.
 */
@Component({
  selector: 'app-discuss-requests',
  templateUrl: './discuss-requests.component.html',
  styleUrls: ['./discuss-requests.component.css']
})
export class DiscussRequestsComponent extends Pageable<TopicDiscussRequest> implements OnInit {
  approving: boolean = false;
  rejecting: boolean = false;

  constructor(@Inject('topicDiscussRequestService') private discussRequestService: ITopicDiscussRequestService,
              @Inject('statusService') private statusService: IStatusService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager) {
    super();
  }

  /**
   * Implementation the OnInit interface. Loads the all pending topic discuss requests
   */
  ngOnInit() {
    this.getAllPendingRequestsPerPage();
  }

  private getAllPendingRequestsPerPage(): void {
    this.discussRequestService.getAllPending(this.getHttpParams())
      .subscribe((page: Page<TopicDiscussRequest>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  /**
   * EventListner on "Approve" button. Set status request as Approved
   * @param {TopicDiscussRequest} request to be approved
   */
  onApprove(request: TopicDiscussRequest): void {
    this.setStatusAndSaveDiscussRequest(request, this.statusService.getApprovedStatus());
  }

  /**
   * EventListner on "Reject" button. Set status request as REJECTED
   * @param {TopicDiscussRequest} request to be rejected
   */
  onReject(request: TopicDiscussRequest): void {
    this.setStatusAndSaveDiscussRequest(request, this.statusService.getRejectedStatus());
  }

  /**
   * eventListner on page buttons.
   * Loads requests accorng to the page current parameters
   */
  onPageChange() {
    this.getAllPendingRequestsPerPage();
  }

  private setStatusAndSaveDiscussRequest(request: TopicDiscussRequest, status: Status) {
    request.status = status;
    this.changeExecutingStatus(status.title);
    this.discussRequestService.updateRequest(request)
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
        'MESSAGES.TOPIC_DISCUSS_REQUEST_CHANGED', {status: translatedStatus}
      )
    );
  }

  private getTranslationString(status: string): string {
    return `STATUS.${status}`;
  }
}
