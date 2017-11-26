import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/operator/toPromise';

import { Pageable } from '../../../shared/entity/pageable';
import { User } from '../../../shared/entity/user';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Page } from '../../../shared/entity/page';
import ITopicDiscussRequestService from '../../../topic/topic-disscuss-request/interface/itopic-discuss-request.service';
import { TopicDiscussRequest } from '../../../shared/entity/topic-discuss-request';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../../shared/translation-service/extended-translation.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-my-discuss-requests',
  templateUrl: './my-discuss-requests.component.html',
  styleUrls: ['./my-discuss-requests.component.css']
})
export class MyDiscussRequestsComponent extends Pageable<TopicDiscussRequest> implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;

  constructor(@Inject('topicDiscussRequestService') private discussRequestService: ITopicDiscussRequestService,
              private authService: AuthenticationService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager) {
    super();
    this.sortColumn = 'id,DESC';
  }

  onPageChange() {
    this.fetchAllDiscussRequestsOfCurrentUser();
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.authService.getCurrentUser;
    this.fetchAllDiscussRequestsOfCurrentUser();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  onDelete(discussReqest: TopicDiscussRequest): void {
    this.discussRequestService.deleteDiscussRequest(discussReqest)
      .subscribe((response) => {
          this.notifySuccessDelete();
          this.onPageChange();
        },
        (error) => {
          this.handleError(error);
          this.onPageChange();
        });
  }

  private fetchAllDiscussRequestsOfCurrentUser() {
    this.discussRequestService.getAllRequestsByUserId(this.loggedUser.id, this.getHttpParams())
      .subscribe((page: Page<TopicDiscussRequest>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  private handleError(error: any) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  private notifySuccessDelete() {
    const translatedStatus = this.translateService.getTranslate('ACTIONS.DELETED');
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
