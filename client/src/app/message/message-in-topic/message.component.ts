import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import IMessageService from "../interface/imessage.service";
import IUserService from "../../user/interface/iuser.service";
import { Message } from '../../shared/entity/message';
import { Constants } from '../../shared/constants/constants';
import { User } from "../../shared/entity/user";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() topicTitle: string;
  @Input() message: Message;
  // @Output() needToUpdate: boolean;
  dateFormat = Constants.getDateTimeFormat;
  isEdit: boolean;
  saving: boolean;
  previousMsgText: string;
  authorMessage: User;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('userService') private userService: IUserService) {
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
    this.messageService.deleteMessage(this.message.id)
      .subscribe((_) => {
        },
        (error: HttpErrorResponse) => this.handleError(error));
  }

  onSave(): void {
    this.saving = true;
    this.messageService.updateMessage(this.message)
      .subscribe(
        (message: Message) => {
          this.message = message;
          console.log("Successfully updated: " + JSON.stringify(this.message));
          this.saving = false;
          this.isEdit = false;
          this.previousMsgText = null;
        },
        (error) => {
          console.log("Error after update " + error);
          this.saving = false;
          this.isEdit = false;
          this.message.text = this.previousMsgText;
          this.handleError(error);
        }
      );
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
