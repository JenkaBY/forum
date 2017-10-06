import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from "../service/admin.service";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { MatSidenavModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  declarations: [
    AdminDashboardComponent
  ],
  providers: [{provide: 'adminService', useClass: AdminService}],
})
export class AdminModule {
}
