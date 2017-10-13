import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutesModule } from './admin-routes.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AdminRoutesModule
    ],
    exports: [
        AdminDashboardComponent,
    ],
    declarations: [
        AdminDashboardComponent
    ],
})
export class AdminModule {
}
