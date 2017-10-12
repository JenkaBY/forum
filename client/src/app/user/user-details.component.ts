import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { User } from '../model/user';
import IUserService from '../service/interface/iuser.service';
import { Constants } from "../common/constants";

@Component({
  selector: 'forum-user-details',
  templateUrl: './user-details.component.html'
})

export class UserDetailsComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  dateFormat = Constants.getDateTimeFormat();

  constructor(@Inject('userService') private userService: IUserService,
              private route: ActivatedRoute) {
  }

  onSave() {
    console.log("Save button was pressed.");
    console.log(this.userForm.get('userData').value);

    // this.userService.update(this.user)
    //   .then(user => this.user = user);
  }

  ngOnInit() {
    this.route
      .paramMap
      .switchMap((params: ParamMap) => this.userService.getById(+params.get('id')))
      .subscribe((user: User) => {
        this.user = user;
        this.initForm();
      })
  }

  dummy(control: FormControl): Promise<any> | Observable<any> {
    return null;
  }

  private initForm() {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'id': new FormControl(this.user.id),
        'name': new FormControl(this.user.name),
        'email': new FormControl(this.user.email)
      })
    })
  }
}
