import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";
import { UserCredential } from "../user-credential.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCredentialForm: FormGroup;
  userCredential: UserCredential;
  invalidCredential: boolean;
  logging: boolean;

  constructor(/*@Inject('authenticationService') */private authService: AuthenticationService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.invalidCredential = false;
    this.logging = false;
    this.initForm();
  }

  onLogin(): void {
    this.logging = true;
    this.invalidCredential = false;
    this.userCredential = {email: this.email.value, password: this.password.value};
    this.authService.login(this.userCredential).subscribe(
      (result: boolean) => {
        console.log('next in login', result);
        this.logging = false;
        this.onBack();
      },
      (err) => {
        this.invalidCredential = true;
        this.logging = false;
        console.log('error in login', err);
      }
    );
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

  onShowAlert() {
    this.invalidCredential = !this.invalidCredential;
  }
}
