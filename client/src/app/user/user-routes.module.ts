import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyTopicsComponent } from './user-dashboard/my-topics/my-topics.component';

const userRoutes: Routes = [
  {
    path: 'user_dashboard', component: UserDashboardComponent,
    children: [
      {path: 'my_topics', component: MyTopicsComponent},
      {path: 'discuss_requests', component: MyTopicsComponent},
      {path: 'create_topic_requests', component: MyTopicsComponent}
    ]
  }
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
