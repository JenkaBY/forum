import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Topic } from '../../shared/entity/topic';
import IMessageService from '../interface/imessage.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { User } from '../../shared/entity/user';
import { GuardService } from '../../authorization/guard.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { environment } from '../../../environments/environment';

/**
 * Describes the new message component on topic(message list) page
 */
@Component({
  selector: 'app-new-message-form',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['./new-message-form.component.css']
})
export class NewMessageFormComponent implements OnInit, OnDestroy {
  @Input() topic: Topic;
  msgForm: FormGroup;
  creating = false;
  loggedUser: User;
  currentUserSubscr: Subscription;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('guardService') private guardService: GuardService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private authService: AuthenticationService) {
  }

  /**
   * Implementation of OnInit interface.
   * Initialize msgForm and subscribes on logged user.
   */
  ngOnInit(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.getCurrentUser;
    this.initForm();
  }

  /**
   * Implementation of OnDestroy interface
   * Unsubscribe on current user.
   */
  ngOnDestroy(): void {
    this.currentUserSubscr.unsubscribe();
  }

  private initForm() {
    this.msgForm = new FormGroup({
      'text': new FormControl(null, [Validators.required]),
      'createdBy': new FormControl(this.loggedUser),
      'inTopic': new FormControl(this.topic),
      'createdAt': new FormControl(null),
      'updatedAt': new FormControl(null),
      'updatedBy': new FormControl(null)
    });
  }

  /**
   * Eventlistner on 'Send' button. Creates new message and sends to backend.
   */
  onSendMsg(): void {
    this.creating = true;
    this.msgForm.get('createdAt').patchValue(new Date());
    this.messageService.createMessage(this.msgForm.value)
      .subscribe(
        (data) => {
          this.creating = false;
          this.msgForm.get('text').patchValue(null);
        },
        (error) => {
          this.handleError(error);
          this.creating = false;
        });
  }

  private handleError(error: any) {
    this.translateService.get('ERROR.COMMON_ERROR').subscribe(
      (translation: string) => {
        this.toastr.error(translation);
      }
    );
    if (!environment.production) {
      console.log(error);
    }
  }

  /**
   * Defines if current user can create messages
   * @returns {boolean} true if can otherwise false.
   */
  canCreateMsg(): boolean {
    return this.guardService.canCreateMsgInTopic(this.topic);
  }

  private isAllowedInTopic(): boolean {
    return this.guardService.canCreateMsgInTopic(this.topic);
  }

  /**
   * indicates if 'Send' button to be disabled
   * @returns {boolean} true if send button to be disabled otherwise false
   */
  get isDisabledSendButton(): boolean {
    return this.msgForm.invalid || this.creating || this.loggedUser.blocked || !this.canCreateMsg();
  }
}
