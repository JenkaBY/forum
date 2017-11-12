import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyTopicsComponent } from './user-dashboard/my-topics/my-topics.component';
import { MyDiscussRequestsComponent } from './user-dashboard/my-discuss-requests/my-discuss-requests.component';
import { MyCreateTopicRequestsComponent } from './user-dashboard/my-create-topic-requests/my-create-topic-requests.component';
import { UserDashboardGuard } from './user-dashboard/user-dashboard.guard';
import { TopicRequestComponent } from '../topic/topic-request/topic-request.component';

const userRoutes: Routes = [
  {
    path: 'user_dashboard',
    component: UserDashboardComponent,
    canActivate: [UserDashboardGuard],
    canActivateChild: [UserDashboardGuard],
    children: [
      {path: 'my_topics', component: MyTopicsComponent},
      {path: 'my_create_topic_requests', component: MyCreateTopicRequestsComponent},
      {path: 'my_discuss_requests', component: MyDiscussRequestsComponent}
    ]
  },
  {
    path: 'topic/request',
    component: TopicRequestComponent,
    canActivate: [UserDashboardGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutesModule {
}
