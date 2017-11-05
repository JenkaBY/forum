import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import IUserService from '../../user/interface/iuser.service';
import { User } from '../../shared/entity/user';
import { passwordsMatchValidator } from '../../shared/matched-passwords';
import { Constants } from '../../shared/constants/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutesConst } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  accountForm: FormGroup;
  account: User;
  minNameLength = {value: 4};
  maxNameLength = {value: 20};
  minPasswordLength = {value: 6};
  maxPasswordLength = {value: 16};
  creating: boolean;
  private mismatchStr = 'mismatch';

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.creating = false;
    this.account = new User();
    this.initForm();
  }

  onCreateAccount(): void {
    this.creating = true;
    this.convertFormToData();
    this.userService.create(this.account)
      .subscribe(
        (user: User) => {
          this.creating = false;
          this.redirectToInfoPage();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.creating = false;
        }
      );
  }

  private initForm(): void {
    this.accountForm = new FormGroup({
      'name': new FormControl('',
        [Validators.required,
          Validators.minLength(Constants.getMinNameLength.value),
          Validators.maxLength(Constants.getMaxNameLength.value)]),
      'email': new FormControl('',
        [Validators.required,
          Validators.email]),
      'password': new FormControl('',
        [Validators.required,
          Validators.minLength(Constants.getMinPasswordLength.value),
          Validators.maxLength(Constants.getMaxPasswordLength.value)]),
      'passwordConfirm': new FormControl('',
        [Validators.required])
    }, passwordsMatchValidator)
  }

  private convertFormToData(): void {
    this.account.name = this.accountForm.get('name').value;
    this.account.email = this.accountForm.get('email').value;
    this.account.password = this.accountForm.get('password').value;
  }

  private redirectToInfoPage(): void {
    this.router.navigate([RoutesConst.CONGRATULATION]);
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
    return this.accountForm.errors && this.accountForm.errors[this.mismatchStr] ?
      this.accountForm.errors[this.mismatchStr] : false;
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
