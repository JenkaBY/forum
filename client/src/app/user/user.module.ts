import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRoutesModule } from './user-routes.module';
import { MyTopicsComponent } from './user-dashboard/my-topics/my-topics.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    UserRoutesModule
  ],
  declarations: [
    UserDashboardComponent,
    MyTopicsComponent
  ],
})
export class UserModule {
}
