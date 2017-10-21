import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { RoutesConst } from '../common/routes.constants';
import { HeaderConst } from "../common/constants";
import { User } from '../model/user';
import IUserService from './interface/iuser.service';
import { Page } from '../common/Page';

@Injectable()
export class UserService implements IUserService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient) {
    }

  getAllUsers(httpParams?: HttpParams): Observable<Page<User>> {
    return this.http.get<Page<User>>(RoutesConst.ADMIN_ALL_USERS, {params: httpParams});
    }

  getById(id: number): Observable<User> {
    return this.http.get<User>(RoutesConst.USER + id);
    }

  deleteById(id: number): any {
    this.http.delete(RoutesConst.USER + id, {headers: this.headers});
    }

  update(user: User): Observable<User> {
    console.log("JSON: ", JSON.stringify(user));
    return this.http.put<User>(RoutesConst.USER + user.id, JSON.stringify(user), {headers: this.headers});
    }

  create(user: User): Observable<User> {
    return this.http.post<User>(RoutesConst.CREATE_NEW_USER, JSON.stringify(user), {headers: this.headers});
    }
}
