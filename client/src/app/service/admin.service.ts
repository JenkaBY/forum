import { Injectable } from '@angular/core';
import IAdminService from './interface/iadmin.service';
import { User } from '../model/user';

@Injectable()
export class AdminService implements IAdminService {
    getAllUsers(): Promise<User[]> {
        return undefined;
    }

    getAllUsersPendingToApprove(): Promise<User[]> {
        return undefined;
    }

    getUsersApprovedByMe(): Promise<User[]> {
        return undefined;
    }

    getUsersRejectedByMe(): Promise<User[]> {
        return undefined;
    }

    getAllBlockedUsers(): Promise<User[]> {
        return undefined;
    }

    constructor() {
    }

}
