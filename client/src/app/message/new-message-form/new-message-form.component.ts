import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import { Topic } from "../../shared/entity/topic";
import IMessageService from "../interface/imessage.service";
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";
import { isInArray } from "../../shared/utilities";
import { Constants } from "../../shared/constants/constants";

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
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUserSubscr = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.authService.getCurrentUser;
    this.initForm();
  }

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
    })
  }

  onSendMsg() {
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

  private handleError(error: Response) {
    console.log(error);
  }

  canCreateMsg(): boolean {
    return this.authService.isManager || (this.authService.isUser && this.isAllowedInTopic());
  }

  private isAllowedInTopic(): boolean {
    if (!this.loggedUser || !this.topic.allowedUsers || this.topic.allowedUsers.length == 0) {
      return false;
    }
    return isInArray(this.topic.allowedUsers, Constants.id, this.loggedUser.id);
  }

  get isDisabledSendButton(): boolean {
    return this.msgForm.invalid || this.creating || this.loggedUser.blocked || !this.canCreateMsg();
  }
}
