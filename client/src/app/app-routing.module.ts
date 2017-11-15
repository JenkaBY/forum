import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminRoutesModule } from './admin/admin-routes.module';
import { RegistrationRoutesModule } from './registration/registration-routes.module';
import { LoginComponent } from './authorization/login/login.component';
import { TopicRoutesModule } from './topic/topic-routes.module';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ManagerRoutesModule } from './manager/manager-routes.module';

const routes: Routes = [
  {path: '', redirectTo: 'topics', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    AdminRoutesModule,
    ManagerRoutesModule,
    RegistrationRoutesModule,
    TopicRoutesModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [
    RouterModule,
    AdminRoutesModule,
    ManagerRoutesModule,
    RegistrationRoutesModule,
    TopicRoutesModule
  ]
})

export class AppRoutingModule {
}
