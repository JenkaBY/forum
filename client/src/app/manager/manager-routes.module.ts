import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CreateTopicRequestsComponent } from './create-topic-requests/create-topic-requests.component';
import { DiscussRequestsComponent } from './discuss-requests/discuss-requests.component';
import { AllTopicsComponent } from './all-topics/all-topics.component';
import { ManagerDashboardGuard } from './manager-dashboard.guard';

const managerRoutes: Routes = [
  {
    path: 'manager',
    component: ManagerDashboardComponent,
    canActivate: [ManagerDashboardGuard],
    canActivateChild: [ManagerDashboardGuard],
    children:
      [
        {path: 'all_topics', component: AllTopicsComponent},
        {path: 'discuss_requests', component: DiscussRequestsComponent},
        {path: 'create_topic_requests', component: CreateTopicRequestsComponent}
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
