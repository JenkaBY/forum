import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDetailsComponent } from './user/user-details/user-details.component';
import { AdminRoutesModule } from './admin/admin-routes.module';
import { RegistrationRoutesModule } from "./registration/registration-routes.module";
import { TestComponent } from "./test/test.component";
import { LoginComponent } from "./authorization/login/login.component";
import { TopicRoutesModule } from "./topic/topic-routes.module";

const routes: Routes = [
  {path: '', redirectTo: 'topics', pathMatch: 'full'},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'private', component: TestComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    AdminRoutesModule,
    RegistrationRoutesModule,
    TopicRoutesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AdminRoutesModule,
    RegistrationRoutesModule,
    TopicRoutesModule
  ]
})

export class AppRoutingModule {
}
