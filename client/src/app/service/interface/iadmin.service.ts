import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { User } from '../../model/user';
import { Page } from '../../common/Page';

/**
 * Service for AdminDashboard
 */
interface IAdminService {
  /**
   * Get all existing users
   * @returns {Promise<Page<User>>}
   * @see User
   */
  getAllUsers(httpParams?: HttpParams): Observable<Page<User>>;

  /**
   * Get all pending to approve users (/admin/user/pending)
   * @returns {Promise<Page<User>>}
   * @see User
   */
  getAllUsersPendingToApprove(httpParams?: HttpParams): Observable<Page<User>>;

  /**
   * Get all approved users by admin (/admin/user/approved)
   * @returns {Promise<Page<User>>}
   */
  getUsersApprovedByMe(httpParams?: HttpParams): Observable<Page<User>>;

  /**
   * Get users rejected by admin. (/admin/user/rejected)
   * @returns {Promise<Page<User>>}
   * @see User
   */
  getUsersRejectedByMe(httpParams?: HttpParams): Observable<Page<User>>;

  /**
   * Get all blocked users (/admin/user/blocked)
   * @returns {Promise<Page<User>>}
   * @see User
   */
  getAllBlockedUsers(httpParams?: HttpParams): Observable<Page<User>>;
}

export default IAdminService;
