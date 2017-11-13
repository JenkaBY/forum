import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import IUserService from '../interface/iuser.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { User } from '../../shared/entity/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUserSubscription: Subscription;
  loggedUser: User;
  userForm: FormGroup;
  minNameLength = {value: 4};
  maxNameLength = {value: 20};
  minPasswordLength = {value: 6};
  maxPasswordLength = {value: 16};
  saving: boolean = false;
  @ViewChild('fileInput') fileInput;

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private location: Location) {

  }

  onSave() {
    if (!!true)
      return;
    this.joinUserData();
    this.userService.update(this.loggedUser)
      .subscribe((user: User) => {
          this.loggedUser = user;
          // this.onBack();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
  }

  ngOnInit() {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.loggedUser = this.authService.getCurrentUser;
    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      'name': new FormControl(this.loggedUser.name),
      'email': new FormControl(this.loggedUser.email)
    });
  }

  onBack(): void {
    this.location.back();
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.projectService.upload(formData, this.project.id)
        .subscribe(res => {
          // do stuff w/my uploaded file
        });
    }
  }

  private joinUserData() {
    this.loggedUser.name = this.userForm.value['name'];
    this.loggedUser.email = this.userForm.value['email'];
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }
}
