import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import IMessageService from "../interface/imessage.service";
import IUserService from "../../user/interface/iuser.service";
import { AuthenticationService } from "../../authorization/authentication.service";
import { Message } from '../../shared/entity/message';
import { Constants } from '../../shared/constants/constants';
import { User } from "../../shared/entity/user";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  // @Input() topicTitle: string;
  @Input() message: Message;
  dateFormat = Constants.getDateTimeFormat;
  isEdit: boolean;
  saving: boolean;
  deleting: boolean;
  previousMsgText: string;
  authorMessage: User;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('userService') private userService: IUserService,
              private authService: AuthenticationService) {
  }

  calculateRowsForEditMsg(): number {
    const oneRowLength = 100;
    let rows = this.message.text.length / oneRowLength;
    return rows < 10 ? 10 : Math.round(rows) + 1;
  }

  ngOnInit(): void {
    this.isEdit = false;
    this.saving = false;
    this.fetchAuthorData();
  }

  onEdit(): void {
    this.previousMsgText = this.message.text;
    this.isEdit = true;
  }

  onCancel(): void {
    this.message.text = this.previousMsgText;
    this.isEdit = false;
  }

  onDelete(): void {
    this.deleting = true;
    this.messageService.deleteMessage(this.message)
      .subscribe((_) => {
          this.deleting = false
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.deleting = false;
        });
  }

  onSave(): void {
    this.saving = true;
    this.messageService.updateMessage(this.message)
      .subscribe(
        (message: Message) => {
          this.message = message;
          this.saving = false;
          this.isEdit = false;
          this.previousMsgText = null;
        },
        (error) => {
          this.saving = false;
          this.isEdit = false;
          this.message.text = this.previousMsgText;
          this.handleError(error);
        }
      );
  }

  canEdit(): boolean {
    const user = this.authService.currentUser;
    if (!user)
      return false;
    if (user.id == this.authorMessage.id || this.authService.isManager) {
      return true;
    }
    return false;
  }

  private fetchAuthorData() {
    this.userService.getById(this.message.createdBy.id)
      .subscribe((user: User) => this.authorMessage = user,
        (error: HttpErrorResponse) => this.handleError(error))
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
