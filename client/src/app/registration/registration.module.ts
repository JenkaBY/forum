import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from 'ng2-translate';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AfterRegistrationPageComponent } from './after-registration-form/after-registration-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    RegistrationFormComponent,
    AfterRegistrationPageComponent
  ]
})
export class RegistrationModule {
}
