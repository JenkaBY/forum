import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { ExtendedTranslationService } from '../../../shared/translation-service/extended-translation.service';

import { User } from '../../../shared/entity/user';
import IUserService from '../../interface/iuser.service';
import IUploadFileService from '../../../shared/iupload-file.service';
import { AuthenticationService } from '../../../authorization/authentication.service';
import { Constants } from '../../../shared/constants/constants';
import { FileLink } from '../../../shared/entity/file-link';
import { environment } from '../../../../environments/environment';

/**
 * Component for user profile.
 */
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
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private authService: AuthenticationService,
              private location: Location) {

  }

  /**
   * Subscribes on logged user, initialize form with data.
   */
  ngOnInit() {
    this.currentUserSubscription = this.authService.changedCurrentUser
      .subscribe((user: User) => this.loggedUser = user);
    this.loggedUser = this.authService.getCurrentUser;
    this.initForm();
  }

  /**
   * Unsubscribe on current user.
   */
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  /**
   * save to backend the user's data.
   */
  onSave() {
    this.joinUserData();
    this.userService.update(this.loggedUser)
      .subscribe((user: User) => {
          this.loggedUser = user;
          this.authService.changedCurrentUser.next(user);
          this.notifySuccessUpdateProfile();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
  }

  private initForm() {
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
  }

  /**
   * return on the previous page
   */
  onBack(): void {
    this.location.back();
  }

  /**
   * Upload photo to backend
   */
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      const imageName = 'image';
      formData.append(imageName, fileBrowser.files[0], fileBrowser.files[0].name);
      this.uploadFileService.uploadUserPhoto(formData)
        .subscribe(
          (fileLinks: FileLink[]) => {
            this.loggedUser.imagePath = fileLinks[0].imagePath;
            this.imagePath.patchValue(this.loggedUser.imagePath);
            this.notifySuccessUploadPhoto();
          },
          error => this.handleError(error)
        );
    }
  }

  private joinUserData() {
    this.loggedUser.name = this.userForm.value['name'];
    this.loggedUser.email = this.userForm.value['email'];
    this.loggedUser.imagePath = this.userForm.value['imagePath'];
  }

  private handleError(error: HttpErrorResponse) {
    if (!environment.production) {
      console.log(error);
    }
    if (error.error && error.error.message) {
      this.toastr.error(error.error.message);
      return;
    }
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
  }

  /**
   * Gets 'name' Abstract control for userForm
   * @returns {AbstractControl} control for userForm
   */
  get name(): AbstractControl {
    return this.userForm.get('name');
  }

  /**
   * Gets 'email' Abstract control for userForm
   * @returns {AbstractControl} control for userForm
   */
  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  /**
   * Gets 'imagePathOption' Abstract control for userForm
   * @returns {AbstractControl} control for userForm
   */
  get imagePathOption(): AbstractControl {
    return this.userForm.get('imageOption');
  }

  /**
   * Gets 'imagePath' Abstract control for userForm
   * @returns {AbstractControl} control for userForm
   */
  get imagePath(): AbstractControl {
    return this.userForm.get('imagePath');
  }

  /**
   * EventLister for 'delete image' Button.
   * Patches value imagePath control of userForm with null.
   */
  onDeleteImage(): void {
    this.userForm.patchValue({imagePath: null});
  }

  private notifySuccessUpdateProfile(): void {
    this.translateService.get('MESSAGES.PROFILE_UPDATED')
      .subscribe(
        (translation: string) => this.toastr.success(translation));
  }

  private notifySuccessUploadPhoto() {
    this.translateService.get('MESSAGES.UPLOADED_USER_PHOTO')
      .subscribe(
        (translation: string) => this.toastr.success(translation));
  }

  private onFailedLoadingImage(event): void {
    this.toastr.warning('Loading image is failed.');
  }
}
