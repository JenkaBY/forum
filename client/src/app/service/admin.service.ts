import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Routes } from '../common/routes.constants';

import { User } from '../model/user';
import IAdminService from './interface/iadmin.service';

@Injectable()
export class AdminService implements IAdminService {

    constructor(private  http: Http) {
    }

    getAllUsers(): Promise<User[]> {
        return this.getUsersByUrl(Routes.ADMIN_ALL_USERS);
    }

    getAllUsersPendingToApprove(): Promise<User[]> {
        return this.getUsersByUrl(Routes.ADMIN_USERS_PENDING_TO_APPROVE);
    }

    getUsersApprovedByMe(): Promise<User[]> {
        return this.getUsersByUrl(Routes.ADMIN_APPROVED_USERS);
    }

    getUsersRejectedByMe(): Promise<User[]> {
        return this.getUsersByUrl(Routes.ADMIN_REJECTED_USERS);
    }

    getAllBlockedUsers(): Promise<User[]> {
        return this.getUsersByUrl(Routes.ADMIN_BLOCKED_USERS);
    }

    private getUsersByUrl(urlRequest: string): Promise<User[]> {
        return this.http.get(urlRequest)
            .toPromise()
            .then(response => {
                console.log(response);
                return response.json()['content'];
            })
            .catch(error => this.errorHandle(error));
    }

    private errorHandle(error): Promise<User> {
        console.log(error);
        return null;
    }
}
