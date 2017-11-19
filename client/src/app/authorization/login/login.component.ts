import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { UserCredential } from '../user-credential';
import { RoleConst } from '../../shared/constants/constants';
import { OAuthTokensData } from '../oauth-token.model';
import { LoginErrorResolver } from '../login-error-resolver';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Component describes login page.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCredentialForm: FormGroup;
  userCredential: UserCredential;
  loginErrorOccured: boolean;
  logging: boolean;
  errorKey: string;

  constructor(private authService: AuthenticationService,
              private location: Location,
              private router: Router) {
  }

  /**
   * implementation of the OnInit interface
   */
  ngOnInit() {
    this.eraseFlashMsg();
    this.logging = false;
    this.initForm();
  }

  /**
   * Event listener of 'Login' button. Makes log in and when successful login redirect to previous page,
   * if error occurred then show flash message
   */
  onLogin(): void {
    this.logging = true;
    this.loginErrorOccured = false;
    this.userCredential = {email: this.email.value, password: this.password.value, rememberMe: this.rememberMe.value};
    this.authService.login(this.userCredential)
      .subscribe(
        (result: OAuthTokensData) => {
          this.logging = false;
          if (result.user.role.title === RoleConst.ADMIN) {
            this.router.navigate(['/admin', 'pending']);
            return;
          }
          this.eraseFlashMsg();
          this.onBack();
        },
        (err: HttpErrorResponse) => {
          this.logging = false;
          const resolver = new LoginErrorResolver(err.error);
          this.showFlashMsg(resolver.getTranslationKey());
        }
      );
  }

  private eraseFlashMsg(): void {
    this.loginErrorOccured = false;
    this.errorKey = '';
  }

  private showFlashMsg(msg: string): void {
    this.loginErrorOccured = true;
    this.errorKey = msg;
  }

  private initForm(): void {
    this.userCredentialForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'rememberMe': new FormControl(false)
    });
  }

  /**
   * Event listener of 'Back' button. Go to previous page.
   */
  onBack(): void {
    this.location.back();
  }

  /**
   * To simplify invoking 'email' control of userCredentialForm
   * @returns {AbstractControl} 'email' control
   */
  get email(): AbstractControl {
    return this.userCredentialForm.get('email');
  }

  /**
   * To simplify invoking 'password' control of userCredentialForm
   * @returns {AbstractControl} 'password' control
   */
  get password(): AbstractControl {
    return this.userCredentialForm.get('password');
  }

  /**
   * To simplify invoking 'rememberMe' control of userCredentialForm
   * @returns {AbstractControl} 'rememberMe' control
   */
  get rememberMe(): AbstractControl {
    return this.userCredentialForm.get('rememberMe');
  }
}
