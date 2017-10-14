import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
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
    this.joinUserData();
    this.userService.update(this.user)
      .then(user => this.user = user)
      .catch(error => console.log(error));
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

  private initForm() {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'id': new FormControl(this.user.id),
        'name': new FormControl(this.user.name),
        'email': new FormControl(this.user.email)
      }),
      'userDataManagement': new FormGroup({
        'role': new FormControl(this.user.role.id),
      })
    })
  }

  private joinUserData() {
    this.user.name = this.userForm.get('userData').value['name'];
    this.user.email = this.userForm.get('userData').value['email'];
    this.user.role.id = this.userForm.get('userDataManagement').value['role'];
  }
}
