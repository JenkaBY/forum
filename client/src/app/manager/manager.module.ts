import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from 'ng2-translate';

import { ManagerRoutesModule } from './manager-routes.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CreateTopicRequestsComponent } from './create-topic-requests/create-topic-requests.component';
import { ModalRejectReasonComponent } from './create-topic-requests/modal-reject-reason/modal-reject-reason.component';
import { DiscussRequestsComponent } from './discuss-requests/discuss-requests.component';
import { AllTopicsComponent } from './all-topics/all-topics.component';
import { UsersInTopicComponent } from './all-topics/users-dicsuss-in-topics/users-in-topic.component';
import { ManagerDashboardGuard } from './manager-dashboard.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    ManagerRoutesModule
  ],
  declarations: [
    ManagerDashboardComponent,
    CreateTopicRequestsComponent,
    ModalRejectReasonComponent,
    DiscussRequestsComponent,
    AllTopicsComponent,
    UsersInTopicComponent
  ],
  entryComponents: [
    ModalRejectReasonComponent,
    UsersInTopicComponent
  ],
  providers: [
    ManagerDashboardGuard
  ]
})
export class ManagerModule {
}
