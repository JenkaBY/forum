import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import IUserService from '../interface/iuser.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { User } from '../../shared/entity/user';
import IUploadFileService from '../../shared/iupload-file.service';
import { Constants } from '../../shared/constants/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUserSubscription: Subscription;
  loggedUser: User;
  userForm: FormGroup;
  minNameLength = {value: 4};
  maxNameLength = {value: 20};

  saving: boolean = false;
  @ViewChild('fileInput') fileInput;
  constructor(@Inject('cacheableUserService') private userService: IUserService,
              @Inject('uploadFileService') private uploadFileService: IUploadFileService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private location: Location) {

  }

  ngOnInit() {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.loggedUser = this.authService.getCurrentUser;
    this.initForm();
    console.log('on init', this.loggedUser);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  onSave() {
    console.log('saved user', this.loggedUser);
    this.joinUserData();
    this.userService.update(this.loggedUser)
      .subscribe((user: User) => {
          this.loggedUser = user;
          // this.onBack();
          console.log('updated user', user);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
  }

  private initForm() {
    console.log(this.loggedUser);
    this.userForm = new FormGroup({
      'name': new FormControl(this.loggedUser.name,
        [Validators.required,
          Validators.minLength(Constants.getMinNameLength.value),
          Validators.maxLength(Constants.getMaxNameLength.value)]),
      'email': new FormControl(this.loggedUser.email,
        [Validators.required,
          Validators.email]),
      'imagePath': new FormControl(this.loggedUser.imagePath),
      'imageOption': new FormControl('imagePath')
    });
    console.log(this.userForm);
  }

  onBack(): void {
    this.location.back();
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      const imageName = 'image';
      formData.append(imageName, fileBrowser.files[0], fileBrowser.files[0].name);
      this.uploadFileService.uploadUserPhoto(formData)
        .subscribe(
          (fileLinks: FileLink[]) => {
            // do stuff w/my uploaded file
            this.loggedUser.imagePath = fileLinks[0].imagePath;
            console.log('uploaded file', fileLinks);
          },
          error => console.log(error)
        );
    }
  }

  private joinUserData() {
    this.loggedUser.name = this.userForm.value['name'];
    this.loggedUser.email = this.userForm.value['email'];
    this.loggedUser.imagePath = this.userForm.value['imagePath'];
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  get name(): AbstractControl {
    return this.userForm.get('name');
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get imagePathOption(): AbstractControl {
    return this.userForm.get('imageOption');
  }

  get imagePath(): AbstractControl {
    return this.userForm.get('imagePath');
  }

  onDeleteImage(): void {
    this.userForm.patchValue({imagePath: null});
  }
}
