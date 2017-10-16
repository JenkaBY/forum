import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static matchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
    if (password != confirmPassword) {
      abstractControl.get('confirmPassword').setErrors({matchPassword: true})
    } else {
      return;
    }
  }
}
