import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from 'ng2-translate';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutesModule } from './admin-routes.module';
import { AdminDashboardGuard } from './admin-dashboard.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './user-list/users.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule,
    AdminRoutesModule
  ],
  declarations: [
    AdminDashboardComponent,
    UserDetailsComponent,
    UsersComponent
  ],
  providers: [
    AdminDashboardGuard
  ]
})
export class AdminModule {
}
