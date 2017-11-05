import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicComponent } from './topic/topic.component';
import { TopicRequestComponent } from './topic-request/topic-request.component';


const topicRoutes: Routes = [
  {path: 'topics', component: TopicListComponent},
  {path: 'topic/request', component: TopicRequestComponent},
  {path: 'topic/:id', component: TopicComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(topicRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TopicRoutesModule {
}
