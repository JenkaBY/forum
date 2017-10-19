import { Component, Inject, Input, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { Constants } from '../common/constants';
import IMessageService from "../service/interface/imessage.service";
import IUserService from "../service/interface/iuser.service";
import { User } from "../model/user";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() topicTitle: string;
  @Input() message: Message;
  dateFormat = Constants.getDateTimeFormat;
  isEdit: boolean;
  saving: boolean;
  previousMsgText: string;
  authorMessage: User;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('userService') private userService: IUserService) {
  }

  calculateRows(): number {
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
    // this.messageService.deleteMessage(this.message.id);
  }

  onSave(): void {
    this.saving = true;
    this.messageService.updateMessage(this.message)
      .then((message: Message) => {
        this.message = message;
        console.log("Successfully updated: " + JSON.stringify(this.message));
        this.saving = false;
        this.isEdit = false;
        this.previousMsgText = null;
      })
      .catch((error) => {
        console.log("Error after update " + error);
        this.saving = false;
        this.isEdit = false;
        this.message.text = this.previousMsgText;
      });
  }

  private fetchAuthorData() {
    this.userService.getById(this.message.createdBy.id)
      .then((user: User) => {
        console.log(JSON.stringify(user));
        this.authorMessage = user;
      })
      .catch(error => console.log(error))
  }
}
