import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate';
import { UserService } from '../service/user.service';
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
    providers: [
        {provide: 'userService', useClass: UserService},
    ],
})
export class AdminModule {
}
