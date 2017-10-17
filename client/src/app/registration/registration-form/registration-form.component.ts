import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import IUserService from "../../service/interface/iuser.service";
import { Account } from "../account";
import { User } from "../../model/user";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  accountForm: FormGroup;
  account: Account;
  minNameLength = 4;
  maxNameLength = 20;
  minPasswordLength = 6;
  maxPasswordLength = 15;

  ngOnInit() {
    this.account = new Account();
    this.initForm();
  }

  constructor(@Inject('userService') private userService: IUserService,
              private router: Router,
              private location: Location) {
  }

  onCreateAccount(): void {
    console.log(JSON.stringify(this.accountForm.value));
    this.convertFormToData();
    this.userService.create(this.convertAccountToUser())
      .then((user: User) => {
        console.log(JSON.stringify(user));
        this.redirectToInfoPage();
      })
      .catch(error => console.log(error));
  }

  private initForm(): void {
    this.accountForm = new FormGroup({
      'name': new FormControl(null,
        [Validators.required,
          Validators.minLength(this.minNameLength),
          Validators.maxLength(this.maxNameLength)]),
      'email': new FormControl(null,
        [Validators.required,
          Validators.email]),
      'password': new FormControl(null,
        [Validators.required,
          Validators.minLength(this.minPasswordLength),
          Validators.maxLength(this.maxPasswordLength)]),
      'passwordConfirm': new FormControl(null,
        [Validators.required
          // ,
          // PasswordValidation.matchPassword
        ])
    })
  }

  private convertFormToData(): void {
    this.account.name = this.accountForm.get('name').value;
    this.account.email = this.accountForm.get('email').value;
    this.account.password = this.accountForm.get('password').value;
  }

  private convertAccountToUser(): User {
    let user = new User();
    user.name = this.account.name;
    user.email = this.account.email;
    user.hashPassword = this.account.password;
    return user;
  }

  private redirectToInfoPage(): void {
    this.router.navigate(['congratulation']);
  }

  onCancel(): void {
    this.location.back();
  }
}
