import { HttpResponse } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import IUserService from '../../user/interface/iuser.service';
import { EntityAware } from '../../shared/entity/entity-aware';

export class DuplicateValidator {

  static isEmailExist(userService: IUserService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return userService.checkEmailExist(control.value)
        .map((res: HttpResponse<EntityAware>) => {
          return res.body.found ? {emailExists: true} : null;
        });
    };
  }

  static isUsernameExist(userService: IUserService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return userService.checkUsernameExist(control.value)
        .map((res: HttpResponse<EntityAware>) => {
          return res.body.found ? {usernameExists: true} : null;
        });
    };
  }
}
