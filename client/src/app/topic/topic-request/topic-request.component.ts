import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { TranslateService } from 'ng2-translate';

import { AuthenticationService } from '../../authorization/authentication.service';
import ITopicRequestService from './interface/icreate-topic-request.service';
import { TopicRequest } from '../../shared/entity/topic-request';
import { User } from '../../shared/entity/user';
import { Constants } from '../../shared/constants/constants';
import { environment } from '../../../environments/environment';
import IStatusService from '../../shared/status/istatus.service';

/**
 * Describes the 'create topic request' page
 */
@Component({
  selector: 'app-topic-request',
  templateUrl: './topic-request.component.html',
  styleUrls: ['./topic-request.component.css']
})
export class TopicRequestComponent implements OnInit, OnDestroy {
  topicRequest: TopicRequest;
  requestForm: FormGroup;
  loggedUser: User;
  currentUserSubscr: Subscription;
  sending = false;
  maxDescriptionLength = Constants.getMaxLengthTopicDescription;
  maxTitleLength = Constants.getMaxLengthTopicTitle;

  constructor(private authService: AuthenticationService,
              @Inject('topicRequestService') private topicRequestService: ITopicRequestService,
              @Inject('statusService') private statusService: IStatusService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private location: Location,
              private router: Router) {
  }

  /**
   * subscribe and load currentUser
   */
  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.loggedUser = this.authService.getCurrentUser;
    this.initForm();
  }

  /**
   * unsubscribes on currentUser
   */
  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
  }

  /**
   * Return to  previous location
   */
  onCancel() {
    this.location.back();
  }

  private initForm() {
    this.requestForm = new FormGroup({
      'requestedTopicTitle': new FormControl('',
        [Validators.required,
          Validators.maxLength(Constants.getMaxLengthTopicTitle.value)]),
      'requestedTopicDescription': new FormControl('',
        [Validators.required,
          Validators.maxLength(Constants.getMaxLengthTopicDescription.value)])
    });
  }

  /**
   * event on press CreateRequest Button. Send the post request to backend. If success result navigate to home page.
   * Else output error to the log.
   */
  onCreateRequest() {
    this.sending = true;
    this.convertFormToTopicRequest();
    this.topicRequestService.createRequest(this.topicRequest).subscribe(
      (topicRequest: TopicRequest) => {
        this.sending = false;
        this.notifySuccessCreated();
        this.router.navigate(['/']);
      },
      (error) => {
        this.sending = false;
        this.handleError(error);
      }
    );
  }

  private convertFormToTopicRequest() {
    this.topicRequest = new TopicRequest();
    this.topicRequest.status = this.statusService.getPendingStatus();
    this.topicRequest.requestedBy = this.loggedUser;
    this.topicRequest.requestedTopicTitle = this.title.value;
    this.topicRequest.requestedTopicDescription = this.description.value;
  }

  /**
   * simplification of invoke the 'requestedTopicTitle' field of formGroup
   * @returns {AbstractControl} for 'requestedTopicTitle' field.
   */
  get title(): AbstractControl {
    return this.requestForm.get('requestedTopicTitle');
  }

  /**
   * simplification of invoke the 'requestedTopicDescription' control of formGroup
   * @returns {AbstractControl} for 'requestedTopicDescription' control.
   */
  get description(): AbstractControl {
    return this.requestForm.get('requestedTopicDescription');
  }

  private handleError(error: any) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  private notifySuccessCreated() {
    this.translateService.get('MESSAGES.TOPIC_REQUEST_CREATED')
      .subscribe(
        (translation: string) => this.toastr.success(translation));
  }
}
