import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "ng2-translate";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TopicComponent } from "./topic/topic.component";
import { TopicListComponent } from "./topic-list/topic-list.component";
import { TopicService } from "./topic.service";
import { MessageModule } from "../message/message.module";
import { MessageService } from "../message/message.service";
import { MessageComponent } from "../message/message-in-topic/message.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MessageModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [
    TopicListComponent,
    TopicComponent,
    MessageComponent
  ],
  providers: [
    {provide: 'topicService', useClass: TopicService},
    {provide: 'messageService', useClass: MessageService}
  ]
})
export class TopicModule {
}