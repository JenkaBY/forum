import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { RoutesConst } from '../shared/constants/routes.constants';
import IAdminService from './interface/iadmin.service';
import { User } from '../shared/entity/user';
import { Page } from '../shared/entity/page';

@Injectable()
export class AdminService implements IAdminService {

  constructor(private  http: HttpClient) {
    }

  getAllUsers(httpParams?: HttpParams): Observable<Page<User>> {
    return this.getUsersByUrl(RoutesConst.ADMIN_ALL_USERS, httpParams);
    }

  getAllUsersPendingToApprove(httpParams?: HttpParams): Observable<Page<User>> {
    return this.getUsersByUrl(RoutesConst.ADMIN_USERS_PENDING_TO_APPROVE, httpParams);
    }

  getUsersApprovedByMe(httpParams?: HttpParams): Observable<Page<User>> {
    return this.getUsersByUrl(RoutesConst.ADMIN_APPROVED_USERS, httpParams);
    }

  getUsersRejectedByMe(httpParams?: HttpParams): Observable<Page<User>> {
    return this.getUsersByUrl(RoutesConst.ADMIN_REJECTED_USERS, httpParams);
    }

  getAllBlockedUsers(httpParams?: HttpParams): Observable<Page<User>> {
    return this.getUsersByUrl(RoutesConst.ADMIN_BLOCKED_USERS, httpParams);
    }

  private getUsersByUrl(urlRequest: string, httpParams?: HttpParams): Observable<Page<User>> {
    return this.http.get<Page<User>>(urlRequest, {params: httpParams});
    }
}
