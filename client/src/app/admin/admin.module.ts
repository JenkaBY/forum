import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutesModule } from './admin-routes.module';
import { AdminDashboardGuard } from './admin-dashboard.guard';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AdminRoutesModule
  ],
  declarations: [
    AdminDashboardComponent
  ],
  providers: [
    AdminDashboardGuard
  ]
})
export class AdminModule {
}
