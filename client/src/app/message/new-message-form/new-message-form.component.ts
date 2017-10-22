import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import { Topic } from "../../shared/entity/topic";
import IMessageService from "../interface/imessage.service";
import { AuthenticationService } from "../../authorization/authentication.service";
import { User } from "../../shared/entity/user";

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
        console.error("subscribe on currentUser in NewMsg", user);
      });
    this.authService.getCurrentUser;
    console.error("Oninit on newMsg");
    this.initForm();
  }

  ngOnDestroy(): void {
    console.error("OnDestroy new Form");
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

  canCreateMsg(): boolean {
    const user = this.authService.getCurrentUser;
    console.log("this.authService.isUserOrManager before if", this.authService.isUserOrManager);
    console.log("user before if ", user);
    // console.log("!user.blocked brfore if", !user.blocked);
    if (this.authService.isUserOrManager) {
      console.log("this.authService.isUserOrManager in if", this.authService.isUserOrManager);
      console.log("user before if ", user);
      console.log("!user.blocked brfore if", !user.blocked);
      return true
    }
    return false;
  }
}
