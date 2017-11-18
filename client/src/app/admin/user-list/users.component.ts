import { Component, Inject, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from 'ng2-translate';

import IAdminService from '../interface/iadmin.service';
import IUserService from '../../user/interface/iuser.service';
import { Page } from '../../shared/entity/page';
import { User } from '../../shared/entity/user';
import { RoutesConst } from '../../shared/constants/routes.constants';
import { AuthenticationService } from '../../authorization/authentication.service';
import { GuardService } from '../../authorization/guard.service';
import { Pageable } from '../../shared/entity/pageable';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent extends Pageable<User> implements OnInit, OnDestroy {
  currentRoute: string;
  admin: User;
  subscrOnCurrentUser: Subscription;
  approving = false;
  deleting = false;
  rejecting = false;
  blocking = false;

  constructor(@Inject('adminService') private adminService: IAdminService,
              @Inject('cacheableUserService') private userService: IUserService,
              @Inject('guardService') private guardService: GuardService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private translateService: TranslateService,
              private authService: AuthenticationService,
              private router: Router) {
    super();
    this.pageSize = 20;
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.subscribeOnCurrentUser();
    this.defineCurrentRouteStr();
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
  getAll(): void {
    this.adminService.getAllUsers(this.getHttpParams())
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
    this.adminService.getAllUsersPendingToApprove(this.getHttpParams())
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
    this.adminService.getUsersRejectedByMe(this.getHttpParams())
      .subscribe((page: Page<User>) => {
          this.setPageData(page);
        },
        (err) => {
          this.handleError(err);
        });
  }

  /**
   * Get all approved users by current logged admin per page
   * @param {HttpParams} httpParams page params for showing users per page
   */
  getUsersApprovedByMe() {
    this.adminService.getUsersApprovedByMe(this.getHttpParams())
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
  getBlockedUsers() {
    this.adminService.getAllBlockedUsers(this.getHttpParams())
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
    this.fetchData();
  }

  private fetchData() {
    switch (this.currentRoute) {
      case RoutesConst.users: {
        this.getAll();
        break;
      }
      case RoutesConst.pending: {
        this.getPendingToApprove();
        break;
      }
      case RoutesConst.rejected: {
        this.getRejectedUsers();
        break;
      }
      case RoutesConst.approved: {
        this.getUsersApprovedByMe();
        break;
      }
      case RoutesConst.blocked: {
        this.getBlockedUsers();
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
          this.notifySuccess(_.id, user.blocked ? 'blocked' : 'unblocked');
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
    user.approverId = this.admin.id;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.notifySuccess(_.id, 'approved');
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
    user.approverId = this.admin.id;
    this.userService.update(user)
      .subscribe(
        (_: User) => {
          this.notifySuccess(_.id, 'rejected');
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
          this.notifySuccess(id, 'deleted');
          this.onPageChange();
          this.deleting = false;
        },
        (error) => {
          this.handleError(error);
          this.onPageChange();
          this.deleting = false;
        });
  }

  canDeleteUser(user: User): boolean {
    return this.guardService.canDeleteUser(user);
  }

  canEditUser(user: User): boolean {
    return this.guardService.canEditUser(user);
  }

  private handleError(error: HttpErrorResponse) {
    this.translateService.get('ERROR.COMMON_ERROR').subscribe(
      (translation: string) => {
        this.toastr.error(translation);
      }
    );
    console.log(error);
  }

  private notifySuccess(id: number, operation: String): void {
    this.translateService.get('MESSAGES.MANAGING_OF_USER', {id: id, operation: operation}).subscribe(
      (translation: string) => {
        console.log(translation);
        this.toastr.success(translation);
      }
    );
  }
}
