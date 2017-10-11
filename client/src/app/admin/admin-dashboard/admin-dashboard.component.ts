import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'forum-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

    isActive = true;
    showMenu = '';

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.router.navigate(['users'], {relativeTo: this.route});
        console.log('init admin dashboard');
    }

    ngOnDestroy() {
        this.isActive = false;
    }

    clicked() {
        console.log('Clicked by All users');
    }
}
