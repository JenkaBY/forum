import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "ng2-translate";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TopicComponent } from "./topic/topic.component";
import { TopicListComponent } from "./topic-list/topic-list.component";
import { MessageComponent } from "../message/message.component";
import { TopicService } from "./topic.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [
    TopicListComponent,
    TopicComponent,
    MessageComponent
  ],
  providers: [
    {provide: 'topicService', useClass: TopicService}
  ]
})
export class TopicModule {
}
