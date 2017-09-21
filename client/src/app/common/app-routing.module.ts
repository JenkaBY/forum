import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from '../user/user-details.component';
import { UsersComponent } from '../user/users.component';
import { TopicsComponent } from '../topics/topics.component';

const routes: Routes = [
    {path: '', redirectTo: 'admin/users', pathMatch: 'full'},
    {path: 'admin/users', component: UsersComponent},
    {path: 'user/:id', component: UserDetailsComponent},
    {path: 'topics', component: TopicsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
