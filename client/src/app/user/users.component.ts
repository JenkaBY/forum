import { Component, Inject, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as _ from 'underscore';

import IAdminService from '../service/interface/iadmin.service';
import IUserService from '../service/interface/iuser.service';
import { Page } from '../common/Page';
import { User } from '../model/user';
import { Constants } from '../common/constants';
import { Router } from '@angular/router';
import { RoutesConstants } from "../common/routes.constants";

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  user: User;
  users: User[];
  approvedBy: User[] = [];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;
  currentRoute: string;
  dateFormat = Constants.getDateTimeFormat();

  constructor(@Inject('adminService') private adminService: IAdminService,
              @Inject('userService') private userService: IUserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.defineCurrentRouteStr();
    this.maxSize = Constants.getMaxSize();
    this.fetchingData();
  }

  private defineCurrentRouteStr() {
    this.currentRoute = this.router.url.split('/').slice(-1)[0];
  }

  getAll(urlParams?: URLSearchParams) {
    this.adminService.getAllUsers(this.setUrlSearchParams(urlParams))
      .then((page: Page<User>) => {
        this.setPageData(page);
      })
      // TODO create flash message if something went wrong
      .catch(err => console.log(err));
  }

  getPendingToApprove(urlParams?: URLSearchParams) {
    this.adminService.getAllUsersPendingToApprove(this.setUrlSearchParams(urlParams))
      .then((page: Page<User>) => {
        this.setPageData(page);
      })
      // TODO create flash message if something went wrong
      .catch(err => console.log(err));
  }

  getRejectedUsers(urlParams?: URLSearchParams) {
    this.adminService.getUsersRejectedByMe(this.setUrlSearchParams(urlParams))
      .then((page: Page<User>) => {
        this.setPageData(page);
      })
      // TODO create flash message if something went wrong
      .catch(err => console.log(err));
  }

  getUsersApprovedByMe(urlParams?: URLSearchParams) {
    this.adminService.getUsersApprovedByMe(this.setUrlSearchParams(urlParams))
      .then((page: Page<User>) => {
        this.setPageData(page);
      })
      // TODO create flash message if something went wrong
      .catch(err => console.log(err));
  }

  getBlockedUsers(urlParams?: URLSearchParams) {
    this.adminService.getAllBlockedUsers(this.setUrlSearchParams(urlParams))
      .then((page: Page<User>) => {
        this.setPageData(page);
      })
      // TODO create flash message if something went wrong
      .catch(err => console.log(err));
  }

  onDelete(id: number) {
    this.userService.deleteById(id);
    console.log('Delete button was pressed. User id is ' + id);
  }

  onPageChange() {
    const params = new URLSearchParams();
    params.append(Constants.getPageParam(), String(this.currentPage - 1));
    this.fetchingData(params);
  }

  private setPageData(page: Page<User>) {
    this.users = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
    this.setAdminsForUsers();
  }

  private setAdminsForUsers() {
    let adminIds = _.uniq(_.compact(_.pluck(_.pluck(this.users, 'approvedBy'), 'id')));
    for (let id of adminIds) {
      if (!_.find(this.approvedBy, (admin) => {
          return id === admin.id
        })) {
        this.userService.getById(id)
          .then((user: User) => this.approvedBy.push(user))
          .catch((error: any) => console.log("error from setPage" + error))
      }
    }
  }

  private setUrlSearchParams(urlParams?: URLSearchParams): URLSearchParams {
    if (!urlParams) {
      urlParams = new URLSearchParams();
    }
    urlParams.append(Constants.getSortParam(), 'id');
    urlParams.append(Constants.getSizeParam(), String(Constants.getPageSize()));
    return urlParams;
  }

  private fetchingData(urlParams?: URLSearchParams) {
    switch (this.currentRoute) {
      case RoutesConstants.users: {
        this.getAll(urlParams);
        break;
      }
      case RoutesConstants.pending: {
        this.getPendingToApprove(urlParams);
        break;
      }
      case RoutesConstants.rejected: {
        this.getRejectedUsers(urlParams);
        break;
      }
      case RoutesConstants.approved: {
        this.getUsersApprovedByMe(urlParams);
        break;
      }
      case RoutesConstants.blocked: {
        this.getBlockedUsers(urlParams);
        break;
      }
    }
  }

  getUserName(id: number): string {
    let fetchedUser = _.find(this.approvedBy, (admin) => {
      return admin.id === id;
    });
    return fetchedUser ? fetchedUser.name : null;
  }

  onBlock(user: User) {
    user.blocked = !user.blocked;
    this.userService.update(user)
      .then((updatedUser: User) => {
          this.onPageChange();
          console.log("updated user " + updatedUser)
        }
      ).catch(error => console.log(error))
  }

  onApprove(user: User) {
    console.log("onApprove user.")
    user.rejected = false;
    // user.approvedBy = this.authService.currentUser();
    this.userService.update(user)
      .then((updatedUser: User) => {
          this.onPageChange();
          console.log("updated user " + updatedUser)
        }
      ).catch(error => console.log(error))
  }

  onReject(user: User) {
    user.rejected = !user.rejected;
    this.userService.update(user)
      .then((updatedUser: User) => {
          this.onPageChange();
          console.log("rejected user " + JSON.stringify(updatedUser))
        }
      ).catch(error => console.log(error))
  }
}
