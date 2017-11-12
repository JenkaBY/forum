import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRoutesModule } from './user-routes.module';
import { MyTopicsComponent } from './user-dashboard/my-topics/my-topics.component';
import { MyDiscussRequestsComponent } from './user-dashboard/my-discuss-requests/my-discuss-requests.component';
import { MyCreateTopicRequestsComponent } from './user-dashboard/my-create-topic-requests/my-create-topic-requests.component';
import { ModifyCreateTopicRequestComponent } from './user-dashboard/my-create-topic-requests/modify-create-topic-request/modify-create-topic-request.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule,
    UserRoutesModule
  ],
  declarations: [
    UserDashboardComponent,
    MyTopicsComponent,
    MyCreateTopicRequestsComponent,
    MyDiscussRequestsComponent,
    ModifyCreateTopicRequestComponent
  ],
  entryComponents: [
    ModifyCreateTopicRequestComponent
  ]
})
export class UserModule {
}