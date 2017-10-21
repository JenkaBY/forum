import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Topic } from "../../shared/entity/topic";
import IMessageService from "../interface/imessage.service";
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";

@Component({
  selector: 'app-new-message-form',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['./new-message-form.component.css']
})
export class NewMessageFormComponent implements OnInit {
  @Input() topic: Topic;
  msgForm: FormGroup;
  user: User;
  creating = false;

  constructor(@Inject('messageService') private messageService: IMessageService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.initForm();
  }

  private initForm() {
    this.msgForm = new FormGroup({
      'text': new FormControl(null, Validators.required),
      'createdBy': new FormControl(this.user),
      'inTopic': new FormControl(this.topic),
      'createdAt': new FormControl(new Date()),
      'updatedAt': new FormControl(null),
      'updatedBy': new FormControl(null)
    })
  }

  onSendMsg() {
    this.creating = true;
    this.messageService.createMessage(this.msgForm.value)
      .subscribe(
        (data) => {
          console.log(data);
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
}
