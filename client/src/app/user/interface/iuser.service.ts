import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpResponse } from '@angular/common/http';

import { User } from '../../shared/entity/user';
import { Page } from '../../shared/entity/page';
import { ChangePassword } from '../../shared/entity/change-password';
import { EntityAware } from '../../shared/entity/entity-aware';

/**
 * Service for User
 */
interface IUserService {
  /**
   * Get all existing users
   * @returns {Observable<User[]>}
   * @see User
   */
  getAllUsers(httpParams?: HttpParams): Observable<Page<User>>;

  /**
   * Get user by id
   * @returns {Observable<User>}
   * @see User
   */
  getById(id: number): Observable<User>;

  /**
   * Delete user by id
   */
  deleteById(id: number): any;

  /**
   * Update user by id. Uses PUT http verb
   * @returns {Observable<User>}
   * @see User
   */
  update(user: User): Observable<User>;

  /**
   * Update user by id. Uses POST http verb
   * @returns {Observable<User>}
   * @see User
   */
  create(user: User): Observable<User>;

  /**
   * Return users by user Ids in array
   * @param {number[]} userIds list of users
   * @returns {Observable<User[]>} Array of users data
   */
  getAllByIds(userIds: number[]): Observable<User[]>;

  changePassword(changePassword: ChangePassword): Observable<any>;

  checkEmailExist(email: string): Observable<HttpResponse<EntityAware>>;

  checkUsernameExist(name: string): Observable<HttpResponse<EntityAware>>;
}

export default IUserService;
