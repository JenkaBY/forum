import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import IMessageService from '../interface/imessage.service';
import IUserService from '../../user/interface/iuser.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { Message } from '../../shared/entity/message';
import { Constants } from '../../shared/constants/constants';
import { User } from '../../shared/entity/user';
import { ToastsManager } from 'ng2-toastr';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { TranslateService } from 'ng2-translate';
import { environment } from '../../../environments/environment';
import { GuardService } from '../../authorization/guard.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * Describes one message component.
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  dateFormat = Constants.getDateTimeFormat;
  isEdit: boolean;
  saving: boolean;
  deleting: boolean;
  previousMsgText: string;
  authorMessage: User;
  currentUserSubscr: Subscription;
  loggedUser: User;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('cacheableUserService') private userService: IUserService,
              @Inject('guardService') private guardService: GuardService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private authService: AuthenticationService) {
  }

  /**
   * Implementation of OnInit interface. Loads author message data.
   */
  ngOnInit(): void {
    this.subscribeOnLoggedUser();
    this.isEdit = false;
    this.saving = false;
    this.fetchAuthorData();
  }

  private subscribeOnLoggedUser(): void {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.loggedUser = this.authService.getCurrentUser;
  }

  /**
   * Eventlistner on 'Edit' button. Open edit form.
   */
  onEdit(): void {
    this.previousMsgText = this.message.text;
    this.isEdit = true;
  }

  /**
   * Event listener on 'Cancel' button. Discard all changes.
   */
  onCancel(): void {
    this.message.text = this.previousMsgText;
    this.isEdit = false;
  }

  /**
   * EventListner on 'delete' button. Deletes message
   */
  onDelete(): void {
    this.deleting = true;
    this.messageService.deleteMessage(this.message)
      .subscribe((_) => {
          this.deleting = false;
          this.notifySuccessMsgDeleted();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.deleting = false;
        });
  }

  /**
   * Eventlistner on Save button. Update message.
   */
  onSave(): void {
    this.saving = true;
    this.messageService.updateMessage(this.message)
      .subscribe(
        (message: Message) => {
          this.message = message;
          this.saving = false;
          this.isEdit = false;
          this.previousMsgText = null;
          this.notifySuccessMsgUpdated();
        },
        (error) => {
          this.saving = false;
          this.isEdit = false;
          this.message.text = this.previousMsgText;
          this.handleError(error);
          this.notifyWarningMsgUpdated();
        }
      );
  }

  /**
   * Defines if current user can edit message
   * @returns {boolean}
   */
  canEdit(): boolean {
    return this.guardService.canEditMsg(this.message);
  }

  private fetchAuthorData() {
    this.userService.getById(this.message.createdBy.id)
      .subscribe((user: User) => this.authorMessage = user,
        (error: HttpErrorResponse) => this.handleError(error));
  }

  private handleError(error: HttpErrorResponse) {
    this.translateService.get('ERROR.COMMON_ERROR').subscribe(
      (translation: string) => {
        this.toastr.error(translation);
      }
    );
    if (!environment.production) {
      console.log(error);
    }
  }

  private calculateRowsForEditMsg(): number {
    const oneRowLength = 100;
    let rows = this.message.text.length / oneRowLength;
    return rows < 10 ? 10 : Math.round(rows) + 1;
  }

  private notifySuccessMsgUpdated() {
    this.toastr.success(this.translateService.getTranslate('MESSAGES.MESSAGE_UPDATED'));
  }

  private notifySuccessMsgDeleted() {
    this.toastr.success(this.translateService.getTranslate('MESSAGES.MESSAGE_DELETED'));
  }

  private notifyWarningMsgUpdated() {
    this.toastr.warning(this.translateService.getTranslate('MESSAGES.MESSAGE_UPDATED_FAILURE'));
  }
}
