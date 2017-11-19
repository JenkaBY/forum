import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { User } from '../../shared/entity/user';
import IUserService from '../../user/interface/iuser.service';
import { Constants } from '../../shared/constants/constants';
import { Role } from '../../shared/entity/role';
import IRoleService from '../../shared/role/irole.service';
import { GuardService } from '../../authorization/guard.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { environment } from '../../../environments/environment';

/**
 * Describes User detail page in admin dashboard
 */
@Component({
  selector: 'forum-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  dateFormat = Constants.getDateTimeFormat;
  minNameLength = {value: 4};
  maxNameLength = {value: 20};
  saving = false;
  roles: Role[];

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              @Inject('roleService') private roleService: IRoleService,
              @Inject('guardService') private guardService: GuardService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private route: ActivatedRoute,
              private location: Location) {
  }

  /**
   * Saves user data and redirects to previous page
   */
  onSave() {
    this.joinUserData();
    this.saving = true;
    this.userService.update(this.user)
      .subscribe((user: User) => {
          this.user = user;
          this.onBack();
          this.saving = false;
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.saving = false;
        }
      );
  }

  /**
   * Implementation the OnInit interface. Load user data by query string params
   */
  ngOnInit() {
    // this.roles = this.roleService.getRoles();
    this.route
      .paramMap
      .switchMap((params: ParamMap) => this.userService.getById(+params.get('id')))
      .subscribe((user: User) => {
        this.user = user;
        this.initForm();
      });
  }

  private initForm() {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'id': new FormControl(this.user.id),
        'name': new FormControl(this.user.name,
          [Validators.required,
            Validators.minLength(Constants.getMinNameLength.value),
            Validators.maxLength(Constants.getMaxNameLength.value)]
        ),
        'email': new FormControl(this.user.email,
          [Validators.required, Validators.email]
        )
      }),
      'userDataManagement': new FormGroup({
        'role': new FormControl(this.user.role.id),
      })
    });
  }

  /**
   * Event listener on Back button. Discards changes and returns on previous page
   */
  onBack(): void {
    this.location.back();
  }

  private joinUserData() {
    this.user.name = this.userForm.get('userData').value['name'];
    this.user.email = this.userForm.get('userData').value['email'];
    this.user.role.id = this.userForm.get('userDataManagement').value['role'];
  }

  private handleError(error: HttpErrorResponse) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  /**
   * Checks if the admin can edit user data.
   * @returns {boolean} if self or SYSTEM user return false, otherwise true
   */
  canEditUser(): boolean {
    return this.guardService.canEditUser(this.user);
  }

  /**
   * Gets 'name' Abstract control for accountForm
   * @returns {AbstractControl} control for accountForm
   */
  get name() {
    return this.userForm.get('userData').get('name');
  }

  /**
   * Gets 'email' Abstract control for accountForm
   * @returns {AbstractControl} control for accountForm
   */
  get email() {
    return this.userForm.get('userData').get('email');
  }
}
