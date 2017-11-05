import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutesConst } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  /**
   * The start page should be "My topics".
   */
  ngOnInit() {
    this.router.navigate([RoutesConst.MY_TOPICS], {relativeTo: this.route});
  }
}
