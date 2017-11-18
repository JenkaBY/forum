import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/entity/user';
import IUserService from '../../interface/iuser.service';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Constants } from '../../../shared/constants/constants';
import { passwordsMatchValidator } from '../../../shared/matched-passwords';
import { ChangePassword } from '../../../shared/entity/change-password';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  minPasswordLength = {value: 6};
  maxPasswordLength = {value: 16};
  currentUserSubscription: Subscription;
  loggedUser: User;
  passwordForm: FormGroup;
  changing: boolean = false;
  private mismatchStr = 'mismatch';

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              private authService: AuthenticationService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.loggedUser = this.authService.getCurrentUser;
    this.initForm();
  }

  initForm() {
    console.log(this.loggedUser);
    this.passwordForm = new FormGroup({
        'currentPassword': new FormControl('',
          [Validators.required]),
        'password': new FormControl('',
          [Validators.required,
            Validators.minLength(Constants.getMinPasswordLength.value),
            Validators.maxLength(Constants.getMaxPasswordLength.value)]),
        'passwordConfirm': new FormControl('', Validators.required)
      },
      passwordsMatchValidator);
    console.log(this.passwordForm);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  get currentPassword(): AbstractControl {
    return this.passwordForm.get('currentPassword');
  }

  get password(): AbstractControl {
    return this.passwordForm.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.passwordForm.get('passwordConfirm');
  }

  onChangePassword(): void {
    console.log('password changed', this.passwordForm);

    const changePassword = new ChangePassword(this.currentPassword.value, this.password.value);
    console.log('changeP', changePassword);
    this.userService.changePassword(changePassword)
      .subscribe((response: Response) => {
          console.log('Password Changed', response);
        },
        (error) => {
          this.handleError(error);
        });
  }

  get passwordMismatch() {
    return this.passwordForm.errors && this.passwordForm.errors[this.mismatchStr] ?
      this.passwordForm.errors[this.mismatchStr] : false;
  }

  onBack() {
    this.location.back();
  }

  private handleError(error: any) {
    console.log(error);
  }
}