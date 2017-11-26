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
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../../shared/translation-service/extended-translation.service';
import { environment } from '../../../../environments/environment';


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

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              private authService: AuthenticationService,
              private toastr: ToastsManager,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private location: Location) {
  }

  private mismatchStr = 'mismatch';

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.loggedUser = this.authService.getCurrentUser;
    this.initForm();
  }

  initForm() {
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
    const changePassword = new ChangePassword(this.currentPassword.value, this.password.value);
    this.userService.changePassword(changePassword)
      .subscribe((_: Response) => {
          this.showSuccessPasswordUpdated();
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
    if (!environment.production) {
      console.log(error);
    }
    if (error.error && error.error.message) {
      this.toastr.error(error.error.message);
      return;
    }
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
  }

  showSuccessPasswordUpdated(): void {
    this.toastr.success(this.translateService.getTranslate('MESSAGES.PASSWORD_CHANGED'));
  }
}