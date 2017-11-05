import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from './entity/user';

export function blockedUser(user: User): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return (!user || user.blocked) ? {'blocked': {value: control.value}} : null;
  };
}
