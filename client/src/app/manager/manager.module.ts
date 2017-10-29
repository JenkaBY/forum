import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from 'ng2-translate';
import { ManagerRoutesModule } from './manager-routes.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CreateTopicRequestsComponent } from './create-topic-requests/create-topic-requests.component';
import { ManagerService } from './manager.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    ManagerRoutesModule
  ],
  declarations: [
    ManagerDashboardComponent,
    CreateTopicRequestsComponent
  ],
  providers: [
    {provide: 'managerService', useClass: ManagerService}
  ]
})
export class ManagerModule {
}
