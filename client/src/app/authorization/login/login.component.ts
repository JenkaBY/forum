import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";
import { UserCredential } from "../user-credential.model";
import { OAuthToken } from "../oauth-token.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCredentialForm: FormGroup;
  userCredential: UserCredential;

  logging: boolean;

  constructor(@Inject('authenticationService') private authService: AuthenticationService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.logging = false;
    this.initForm();
  }

  onLogin(): void {
    this.logging = true;
    this.userCredential = {email: this.email.value, password: this.password.value};
    this.authService.login(this.userCredential)
      .then((token: OAuthToken) => {
        console.log(token);
        this.logging = false;
      })
      .catch(err => console.log('Error in login: ' + err));
  }

  private initForm(): void {
    this.userCredentialForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }

  onBack(): void {
    this.location.back();
  }

  private redirectToSecretPage(): void {
    this.router.navigate(['private']);
  }

  get email(): AbstractControl {
    return this.userCredentialForm.get('email');
  }

  get password(): AbstractControl {
    return this.userCredentialForm.get('password');
  }
}
