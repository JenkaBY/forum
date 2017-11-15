import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './user-list/users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardGuard } from './admin-dashboard.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminDashboardComponent,
    canActivate: [AdminDashboardGuard],
    canActivateChild: [AdminDashboardGuard],
    children: [
      {path: 'user/:id', component: UserDetailsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'pending', component: UsersComponent},
      {path: 'approved', component: UsersComponent},
      {path: 'rejected', component: UsersComponent},
      {path: 'blocked', component: UsersComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutesModule {
}
