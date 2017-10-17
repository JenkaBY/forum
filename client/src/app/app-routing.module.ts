import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDetailsComponent } from './user/user-details.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicComponent } from './topic/topic.component';
import { AdminRoutesModule } from './admin/admin-routes.module';
import { RegistrationRoutesModule } from "./registration/registration-routes.module";

const routes: Routes = [
  {path: '', redirectTo: 'topics', pathMatch: 'full'},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'topics', component: TopicsComponent},
  {path: 'topic/:id', component: TopicComponent}
];

@NgModule({
  imports: [
    AdminRoutesModule,
    RegistrationRoutesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AdminRoutesModule,
    RegistrationRoutesModule
  ]
})

export class AppRoutingModule {
}
