import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicComponent } from './topic/topic.component';


const topicRoutes: Routes = [
  {path: 'topics', component: TopicListComponent},
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
