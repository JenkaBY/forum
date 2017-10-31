import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from 'ng2-translate';

import { ManagerRoutesModule } from './manager-routes.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CreateTopicRequestsComponent } from './create-topic-requests/create-topic-requests.component';
import { ModalRejectReasonComponent } from './create-topic-requests/modal-reject-reason/modal-reject-reason.component';
import { ManagerService } from './manager.service';

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
    ModalRejectReasonComponent
  ],
  entryComponents: [
    ModalRejectReasonComponent
  ],
  providers: [
    {provide: 'managerService', useClass: ManagerService}
  ]
})
export class ManagerModule {
}
