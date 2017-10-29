import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDetailsComponent } from './user/user-details/user-details.component';
import { AdminRoutesModule } from './admin/admin-routes.module';
import { RegistrationRoutesModule } from './registration/registration-routes.module';
import { LoginComponent } from './authorization/login/login.component';
import { TopicRoutesModule } from './topic/topic-routes.module';
import { ManagerModule } from './manager/manager.module';

const routes: Routes = [
  {path: '', redirectTo: 'topics', pathMatch: 'full'},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    AdminRoutesModule,
    ManagerModule,
    RegistrationRoutesModule,
    TopicRoutesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AdminRoutesModule,
    ManagerModule,
    RegistrationRoutesModule,
    TopicRoutesModule
  ]
})

export class AppRoutingModule {
}
