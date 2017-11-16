import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { ApiConst, RoutesConst } from '../shared/constants/routes.constants';
import { HeaderConst } from '../shared/constants/constants';
import { User } from '../shared/entity/user';
import IUserService from './interface/iuser.service';
import { Page } from '../shared/entity/page';
import { ChangePassword } from '../shared/entity/change-password';

@Injectable()
export class UserCacheableService implements IUserService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);
  private cacheUsers: Map<number, User>;

  constructor(private  http: HttpClient) {
    this.cacheUsers = new Map();
  }

  getAllUsers(httpParams?: HttpParams): Observable<Page<User>> {
    return this.http.get<Page<User>>(
      RoutesConst.ADMIN_ALL_USERS,
      {params: httpParams}
    );
  }

  getById(id: number): Observable<User> {
    if (this.cacheUsers.has(id)) {
      return Observable.of(this.cacheUsers.get(id));
    }
    return this.http.get<User>(RoutesConst.USER + id)
      .do((user: User) => this.cacheUsers.set(user.id, user));
  }

  deleteById(id: number): any {
    return this.http.delete(RoutesConst.USER + id,
      {headers: this.headers}
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(RoutesConst.USER + user.id, user,
      {headers: this.headers}
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(RoutesConst.CREATE_NEW_USER, JSON.stringify(user),
      {headers: this.headers}
    );
  }

  getAllByIds(userIds: number[]): Observable<User[]> {
    return this.http.get<User[]>(
      RoutesConst.USERS_BY_IDS,
      {params: new HttpParams().set('ids', String(userIds))}
    );
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http.put(ApiConst.CHANGE_PASSWORD, changePassword, {headers: this.headers, observe: 'response'});
  }
}
