import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import IAdminService from '../../admin/interface/iadmin.service';
import IUserService from '../interface/iuser.service';
import { Page } from '../../shared/entity/page';
import { User } from '../../shared/entity/user';
import { Constants } from '../../shared/constants/constants';
import { RoutesConst } from "../../shared/constants/routes.constants";
import { AuthenticationService } from "../../authorization/authentication.service";

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  user: User;
  users: User[];
  approvers: User[];
  currentPage: number;
  totalElements: number;
  pageSize = 20;
  maxSize: number;
  currentRoute: string;
  dateFormat: string;
  admin: User;
  subscrOnCurrentUser: Subscription;
  approving = false;
  deleting = false;
  rejecting = false;
  blocking = false;

  constructor(@Inject('adminService') private adminService: IAdminService,
              @Inject('userService') private userService: IUserService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscribeOnCurrentUser();
    this.currentPage = 1;
    this.dateFormat = Constants.getDateTimeFormat;
    this.approvers = [];
    this.defineCurrentRouteStr();
    this.maxSize = Constants.getMaxSize;
    this.fetchData();
  }

  /**
   * Unsubscribe on current User.
   */
  ngOnDestroy() {
    this.subscrOnCurrentUser.unsubscribe();
  }

  /**
   * Create subscription on the current user.
   */
  private subscribeOnCurrentUser(): void {
    this.subscrOnCurrentUser = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.admin = user;
      });
    this.admin = this.authService.getCurrentUser;
  }

  private defineCurrentRouteStr(): void {
    this.currentRoute = this.router.url.split('/').slice(-1)[0];
  }

  /**
   * Get all users  per page
   * @param {HttpParams} httpParams page params for showing users per page
   */
  getAll(httpParams?: HttpParams): void {
    this.adminService.getAllUsers(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  /**
   * Get all pending to approve users  per page
   * @param {HttpParams} httpParams page params for showing users per page
   */
  getPendingToApprove(httpParams?: HttpParams) {
    this.adminService.getAllUsersPendingToApprove(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  /**
   * Get all rejected users by current logged admin per page
   * @param {HttpParams} httpParams page params for showing users per page
   */
  getRejectedUsers(httpParams?: HttpParams) {
    this.adminService.getUsersRejectedByMe(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  /**
   * Get all approved users by current loged admin per page
   * @param {HttpParams} httpParams page params for showing users per page
   */
  getUsersApprovedByMe(httpParams?: HttpParams) {
    this.adminService.getUsersApprovedByMe(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  /**
   * Get all blocked user per page
   * @param {HttpParams} httpParams page params for showing users per page
   *
   */
  getBlockedUsers(httpParams?: HttpParams) {
    this.adminService.getAllBlockedUsers(this.setHttpParams(httpParams))
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  /**
   * Need to be invoked after changing any state of user.
   */
  onPageChange() {
    const params = new HttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    this.fetchData(params);
  }

  private setPageData(page: Page<User>) {
    this.users = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  private setHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(this.pageSize));
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

  /**
   * Change blocked state of user.  After changing state refresh content
   * @param {User} user need to be blocked
   */
  onBlock(user: User) {
    this.blocking = true;
    user.blocked = !user.blocked;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.onPageChange();
          this.blocking = false;
        },
        (error => {
          this.handleError(error);
          this.blocking = false;
        })
      );
  }

  /**
   * Approve user. After changing state refresh content
   * @param {User} user need to be approved
   */
  onApprove(user: User) {
    this.approving = true;
    user.rejected = false;
    user.approver_id = this.admin.id;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.onPageChange();
          this.approving = false;
        },
        (error => {
          this.handleError(error);
          this.approving = false;
        })
      );
  }

  /**
   * Reject user. After changing state refresh content
   * @param {User} user need to be rejected
   */
  onReject(user: User) {
    user.rejected = true;
    this.rejecting = true;
    user.approver_id = this.admin.id;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.onPageChange();
          this.rejecting = false;
        },
        (error => {
          this.handleError(error);
          this.rejecting = false;
        })
      );
  }

  /**
   * Delete user from DB. After changing state refresh content
   * @param {User} user need to be deleted
   */
  onDelete(id: number) {
    this.deleting = true;
    this.userService.deleteById(id)
      .subscribe((result) => {
          this.onPageChange();
          this.deleting = false;
        },
        (error) => {
          this.handleError(error);
          this.onPageChange();
          this.deleting = false;
        });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
  }
}
