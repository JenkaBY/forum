import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import IUserService from "../../service/interface/iuser.service";
import { Account } from "../account";
import { User } from "../../model/user";
import { passwordsMatchValidator } from "../../shared/matched-passwords";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  accountForm: FormGroup;
  account: Account;
  minNameLength = {value: 4};
  maxNameLength = {value: 20};
  minPasswordLength = {value: 6};
  maxPasswordLength = {value: 16};
  creating: boolean;

  ngOnInit() {
    this.creating = false;
    this.account = new Account();
    this.initForm();
  }

  constructor(@Inject('userService') private userService: IUserService,
              private router: Router,
              private location: Location) {
  }

  onCreateAccount(): void {
    this.creating = true;
    console.log(JSON.stringify(this.accountForm.value));
    this.convertFormToData();
    this.userService.create(this.convertAccountToUser())
      .then((user: User) => {
        console.log(JSON.stringify(user));
        this.creating = false;
        this.redirectToInfoPage();
      })
      .catch(error => {
        console.log(error);
        this.creating = false;
      });
  }

  private initForm(): void {
    this.accountForm = new FormGroup({
      'name': new FormControl('',
        [Validators.required,
          Validators.minLength(this.minNameLength.value),
          Validators.maxLength(this.maxNameLength.value)]),
      'email': new FormControl('',
        [Validators.required,
          Validators.email]),
      'password': new FormControl('',
        [Validators.required,
          Validators.minLength(this.minPasswordLength.value),
          Validators.maxLength(this.maxPasswordLength.value)]),
      'passwordConfirm': new FormControl('',
        [Validators.required])
    }, passwordsMatchValidator)
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

  get name() {
    return this.accountForm.get('name');
  }

  get email() {
    return this.accountForm.get('email');
  }

  get password() {
    return this.accountForm.get('password');
  }

  get passwordConfirm() {
    return this.accountForm.get('passwordConfirm');
  }

  get passwordMismatch() {
    return this.accountForm.errors && this.accountForm.errors['mismatch'] ?
      this.accountForm.errors['mismatch'] : false;
  }
}
