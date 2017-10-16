import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user/user-details.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicComponent } from './topic/topic.component';
import { AdminRoutesModule } from './admin/admin-routes.module';
import { RegistrationFormComponent } from "./registration/registration-form/registration-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'topics', pathMatch: 'full'},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'topics', component: TopicsComponent},
  {path: 'topic/:id', component: TopicComponent},
  {path: 'signup', component: RegistrationFormComponent}
];

@NgModule({
  imports: [
    AdminRoutesModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule, AdminRoutesModule]
})

export class AppRoutingModule {
}
