import { FormGroup } from '@angular/forms';

export function passwordsMatchValidator(formGroup: FormGroup) {
  return formGroup.get('password').value === formGroup.get('passwordConfirm').value ?
    null : {'mismatch': true};
}
