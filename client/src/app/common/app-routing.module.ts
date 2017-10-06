import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from '../user/user-details.component';
import { UsersComponent } from '../user/users.component';
import { TopicsComponent } from '../topics/topics.component';
import { TopicComponent } from '../topic/topic.component';
import { AdminDashboardComponent } from "../admin/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
    {path: '', redirectTo: 'topics', pathMatch: 'full'},
  {path: 'admin/dashboard', component: AdminDashboardComponent},
    {path: 'admin/users', component: UsersComponent},
    {path: 'user/:id', component: UserDetailsComponent},
    {path: 'topics', component: TopicsComponent},
    {path: 'topic/:id', component: TopicComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
