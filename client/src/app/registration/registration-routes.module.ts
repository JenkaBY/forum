import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AfterRegistrationPageComponent } from './after-registration-form/after-registration-page.component';

const registrationRoutes: Routes = [
  {path: 'signup', component: RegistrationFormComponent},
  {path: 'CONGRATULATION', component: AfterRegistrationPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(registrationRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RegistrationRoutesModule {
}
