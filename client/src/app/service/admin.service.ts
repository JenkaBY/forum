import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import { RoutesConstants } from '../common/routes.constants';
import IAdminService from './interface/iadmin.service';
import { User } from '../model/user';
import { Page } from '../common/Page';

@Injectable()
export class AdminService implements IAdminService {

    constructor(private  http: Http) {
    }

    getAllUsers(urlParams?: URLSearchParams): Promise<Page<User>> {
      return this.getUsersByUrl(RoutesConstants.ADMIN_ALL_USERS, urlParams);
    }

    getAllUsersPendingToApprove(urlParams?: URLSearchParams): Promise<Page<User>> {
      return this.getUsersByUrl(RoutesConstants.ADMIN_USERS_PENDING_TO_APPROVE, urlParams);
    }

    getUsersApprovedByMe(urlParams?: URLSearchParams): Promise<Page<User>> {
      return this.getUsersByUrl(RoutesConstants.ADMIN_APPROVED_USERS, urlParams);
    }

    getUsersRejectedByMe(urlParams?: URLSearchParams): Promise<Page<User>> {
      return this.getUsersByUrl(RoutesConstants.ADMIN_REJECTED_USERS, urlParams);
    }

    getAllBlockedUsers(urlParams?: URLSearchParams): Promise<Page<User>> {
      return this.getUsersByUrl(RoutesConstants.ADMIN_BLOCKED_USERS, urlParams);
    }

    private getUsersByUrl(urlRequest: string, urlParams?: URLSearchParams): Promise<Page<User>> {
      const params = new RequestOptions({params: urlParams});
      return this.http.get(urlRequest, params)
            .toPromise()
            .then(response => {
              console.log(response.json());
              return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    private errorHandle(error): Promise<Page<User>> {
        console.log(error);
        return null;
    }
}
