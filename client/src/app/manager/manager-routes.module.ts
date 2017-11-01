import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../user/user-list/users.component';

import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CreateTopicRequestsComponent } from './create-topic-requests/create-topic-requests.component';
import { DiscussRequestsComponent } from './discuss-requests/discuss-requests.component';

const managerRoutes: Routes = [
  {
    path: 'manager', component: ManagerDashboardComponent, children: [
    {path: 'topics', component: UsersComponent},
    {path: 'discuss', component: DiscussRequestsComponent},
    {path: 'create', component: CreateTopicRequestsComponent}
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(managerRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ManagerRoutesModule {
}
