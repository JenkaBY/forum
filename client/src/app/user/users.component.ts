import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import * as _ from 'underscore';

import IAdminService from '../service/interface/iadmin.service';
import IUserService from '../service/interface/iuser.service';
import { Page } from '../common/Page';
import { User } from '../model/user';
import { Constants } from '../common/constants';
import { RoutesConst } from "../common/routes.constants";

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  user: User;
  users: User[];
  approvers: User[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;
  currentRoute: string;
  dateFormat: string;

  constructor(@Inject('adminService') private adminService: IAdminService,
              @Inject('userService') private userService: IUserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.dateFormat = Constants.getDateTimeFormat;
    this.approvers = [];
    this.defineCurrentRouteStr();
    this.maxSize = Constants.getMaxSize;
    this.fetchData();
  }

  private defineCurrentRouteStr(): void {
    this.currentRoute = this.router.url.split('/').slice(-1)[0];
  }

  getAll(httpParams?: HttpParams): void {
    this.adminService.getAllUsers(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
    // .then((page: Page<User>) => {
    //   this.setPageData(page);
    // })
    // // TODO create flash message if something went wrong
    // .catch(err => console.log(err));
  }

  getPendingToApprove(httpParams?: HttpParams) {
    this.adminService.getAllUsersPendingToApprove(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  getRejectedUsers(httpParams?: HttpParams) {
    this.adminService.getUsersRejectedByMe(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  getUsersApprovedByMe(httpParams?: HttpParams) {
    this.adminService.getUsersApprovedByMe(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  getBlockedUsers(httpParams?: HttpParams) {
    this.adminService.getAllBlockedUsers(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  onDelete(id: number) {
    this.userService.deleteById(id);
    console.log('Delete button was pressed. User id is ' + id);
  }

  onPageChange() {
    const params = new HttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    this.fetchData(params);
  }

  private setPageData(page: Page<User>) {
    this.users = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
    this.setAdminsForUsers();
  }

  private setAdminsForUsers() {
    let adminIds = _.uniq(_.compact(_.pluck(_.pluck(this.users, 'approvers'), 'id')));
    for (let id of adminIds) {
      if (!_.find(this.approvers, (admin) => {
          return id === admin.id
        })) {
        this.userService.getById(id)
          .subscribe(
            (user: User) => {
              this.approvers.push(user);
            },
            (error => {
              this.handleError(error);
            })
          )
      }
    }
  }

  private setHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(Constants.getPageSize));
    return httpParams;
  }

  private fetchData(httpParams?: HttpParams) {
    switch (this.currentRoute) {
      case RoutesConst.users: {
        this.getAll(httpParams);
        break;
      }
      case RoutesConst.pending: {
        this.getPendingToApprove(httpParams);
        break;
      }
      case RoutesConst.rejected: {
        this.getRejectedUsers(httpParams);
        break;
      }
      case RoutesConst.approved: {
        this.getUsersApprovedByMe(httpParams);
        break;
      }
      case RoutesConst.blocked: {
        this.getBlockedUsers(httpParams);
        break;
      }
    }
  }

  getUserName(id: number): string {
    let fetchedUser = _.find(this.approvers, (admin) => {
      return admin.id === id;
    });
    return fetchedUser ? fetchedUser.name : null;
  }

  onBlock(user: User) {
    user.blocked = !user.blocked;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.onPageChange();
          console.log("rejected user " + JSON.stringify(_))
        },
        (error => {
          this.handleError(error);
        })
      );
  }

  onApprove(user: User) {
    console.log("onApprove user.")
    user.rejected = false;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.onPageChange();
          console.log("rejected user " + JSON.stringify(_))
        },
        (error => {
          this.handleError(error);
        })
      );
  }

  onReject(user: User) {
    user.rejected = !user.rejected;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.onPageChange();
          console.log("rejected user " + JSON.stringify(_))
        },
        (error => {
          this.handleError(error);
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
