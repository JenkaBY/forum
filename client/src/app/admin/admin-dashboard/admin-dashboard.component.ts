import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from "../../common/routes.constants";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  isActive = true;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.navigate([RoutesConstants.pending], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.isActive = false;
  }
}
