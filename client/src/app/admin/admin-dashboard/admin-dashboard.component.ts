import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutesConst } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  /**
   * The start page should be "Pending to approve users". Also 'current user' should be initialized.
   */
  ngOnInit() {
    this.router.navigate([RoutesConst.pending], {relativeTo: this.route});
  }
}
