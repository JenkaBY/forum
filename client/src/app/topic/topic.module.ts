import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopicComponent } from './topic/topic.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';
import { MessageComponent } from '../message/message-in-topic/message.component';
import { NewMessageFormComponent } from '../message/new-message-form/new-message-form.component';
import { NeedToBeLoggedComponent } from '../layout/need-to-be-logged/need-to-be-logged.component';
import { TopicInfoComponent } from './topic-info/topic-info.component';
import { ModalTopicContentComponent } from './edit-topic/modal-content/modal-topic-content.component';
import { TopicRequestComponent } from './topic-request/topic-request.component';

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
    MessageComponent,
    NewMessageFormComponent,
    NeedToBeLoggedComponent,
    TopicInfoComponent,
    ModalTopicContentComponent,
    TopicRequestComponent
  ],
  entryComponents: [
    ModalTopicContentComponent
  ],
  providers: [
    {provide: 'messageService', useClass: MessageService}
  ]
})
export class TopicModule {
}
