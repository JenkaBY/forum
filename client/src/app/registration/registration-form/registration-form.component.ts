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
import { DuplicateValidator } from '../validators/duplicate-validator';
import { ToastsManager } from 'ng2-toastr';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { TranslateService } from 'ng2-translate';
import { environment } from '../../../environments/environment.prod';

/**
 * Describes Registration of new account (Sign up) page.
 */
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
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private router: Router,
              private location: Location) {
  }

  /**
   * Implements the OnInit interface. Initialize account.
   */
  ngOnInit() {
    this.creating = false;
    this.account = new User();
    this.initForm();
  }

  /**
   * EventListner of 'Create account' button. By clicking on the button creates account on server. If account was created, redirects to
   * congratulation page.
   */
  onCreateAccount(): void {
    this.creating = true;
    this.convertFormToData();
    this.userService.create(this.account)
      .subscribe(
        (user: User) => {
          this.creating = false;
          this.notifySuccessCreated();
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
          Validators.maxLength(Constants.getMaxNameLength.value)],
        [DuplicateValidator.isUsernameExist(this.userService)]
      ),
      'email': new FormControl('',
        [Validators.required, Validators.email],
        [DuplicateValidator.isEmailExist(this.userService)]),
      'password': new FormControl('',
        [Validators.required,
          Validators.minLength(Constants.getMinPasswordLength.value),
          Validators.maxLength(Constants.getMaxPasswordLength.value)]),
      'passwordConfirm': new FormControl('',
        [Validators.required])
    }, passwordsMatchValidator);
  }

  private convertFormToData(): void {
    this.account.name = this.accountForm.get('name').value;
    this.account.email = this.accountForm.get('email').value;
    this.account.password = this.accountForm.get('password').value;
  }

  private redirectToInfoPage(): void {
    this.router.navigate([RoutesConst.CONGRATULATION]);
  }

  /**
   * Cancel of creation new user account and go back to previous page
   */
  onCancel(): void {
    this.location.back();
  }

  /**
   * Gets 'name' Abstract control for accountForm
   * @returns {AbstractControl} control for accountForm
   */
  get name() {
    return this.accountForm.get('name');
  }

  /**
   * Gets 'email' Abstract control for accountForm
   * @returns {AbstractControl} control for accountForm
   */
  get email() {
    return this.accountForm.get('email');
  }

  /**
   * Gets 'password' Abstract control for accountForm
   * @returns {AbstractControl} control for accountForm
   */
  get password() {
    return this.accountForm.get('password');
  }

  /**
   * Gets 'passwordConfirm' Abstract control for accountForm
   * @returns {AbstractControl} control for accountForm
   */
  get passwordConfirm() {
    return this.accountForm.get('passwordConfirm');
  }

  /**
   * Defines if password and passwordConfirmation match.
   * @returns {boolean} true if passwords don't match otherwise false
   */
  get passwordMismatch() {
    return this.accountForm.errors && this.accountForm.errors[this.mismatchStr] ?
      this.accountForm.errors[this.mismatchStr] : false;
  }

  private handleError(error: HttpErrorResponse) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  private notifySuccessCreated() {
    this.translateService.get('MESSAGES.ACCOUNT_CREATED')
      .subscribe(
        (translation: string) => this.toastr.success(translation));
  }
}
