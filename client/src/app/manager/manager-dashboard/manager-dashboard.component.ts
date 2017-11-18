import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConst } from '../../shared/constants/routes.constants';

/**
 * Describes manager dashboard. Shows only side menu panel
 */
@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  /**
   * Implementation the OnInit interface. Redirects to start manager page - create topic requests.
   */
  ngOnInit() {
    this.router.navigate([RoutesConst.MANAGER_DASHBOARD_CREATE_TOPIC_REQUESTS], {relativeTo: this.route});
  }
}
