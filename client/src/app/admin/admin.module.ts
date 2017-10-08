import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../service/admin.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TranslateModule } from 'ng2-translate';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        AdminDashboardComponent
    ],
    exports: [
        AdminDashboardComponent
    ],
    providers: [{provide: 'adminService', useClass: AdminService}],
})
export class AdminModule {
}
