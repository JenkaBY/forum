import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authorization/authentication.service';
import ITopicRequestService from './interface/icreate-topic-request.service';
import { TopicRequest } from '../../shared/entity/topic-request';
import { User } from '../../shared/entity/user';
import { Constants } from '../../shared/constants/constants';
import { Status } from '../../shared/entity/topic-discuss-request';

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
    // this.loadTopicDiscussRequest();
    this.initForm();
  }

  /**
   * unsubscribe on currentUser
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

  private handleError(error: any) {
    console.log(error);
  }

  private initForm() {
    this.requestForm = new FormGroup({
      'requestedTopicTitle': new FormControl('',
        [Validators.required,
          Validators.maxLength(Constants.getMaxLengthTopicTitle.value)]),
      'requestedTopicDescription': new FormControl('',
        [Validators.required,
          Validators.maxLength(Constants.getMaxLengthTopicDescription.value)])
    })
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
        this.router.navigate(['/']);
      },
      (error) => {
        this.sending = false;
        this.handleErorr(error);
      }
    );
  }

  private convertFormToTopicRequest() {
    this.topicRequest = new TopicRequest();
    this.topicRequest.status = Status.PENDING;
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
   * simplification of invoke the 'requestedTopicDescription' field of formGroup
   * @returns {AbstractControl} for 'requestedTopicDescription' field.
   */
  get description(): AbstractControl {
    return this.requestForm.get('requestedTopicDescription');
  }

  private handleErorr(error: any) {
    console.log(error);
  }
}
