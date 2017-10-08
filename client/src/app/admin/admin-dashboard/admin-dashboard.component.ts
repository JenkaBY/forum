import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'forum-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    isActive = true;
    showMenu = '';

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    constructor() {
    }

    ngOnInit() {
    }

    clicked() {
        console.log('Clicked by All users');
    }
}
