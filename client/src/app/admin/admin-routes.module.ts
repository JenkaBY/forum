import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../user/users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const adminRoutes: Routes = [
    {
        path: 'admin', component: AdminDashboardComponent, children: [
        {
            path: 'users', component: UsersComponent
        }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutesModule {
}