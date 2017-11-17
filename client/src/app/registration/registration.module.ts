import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from 'ng2-translate';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AfterRegistrationPageComponent } from './after-registration-form/after-registration-page.component';
import { DuplicateValidator } from './validators/duplicate-validator';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    RegistrationFormComponent,
    AfterRegistrationPageComponent
  ],
  providers: [
    DuplicateValidator
  ]
})
export class RegistrationModule {
}
