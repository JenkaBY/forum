import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserDetailsComponent } from "../user/user-details.component";
import { UsersComponent } from "../user/users.component";

const routes: Routes = [
    {path: '', redirectTo: 'admin/users', pathMatch: 'full'},
    {path: 'admin/users', component: UsersComponent},
    {path: 'user/:id', component: UserDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
