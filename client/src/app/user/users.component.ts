import { Component, Inject, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { IAdminService } from '../service/interface/iadmin.service';
import { IUserService } from '../service/interface/iuser.service';
import { Page } from '../common/Page';
import { User } from '../model/user';
import { Constants } from '../common/constants';

@Component({
    selector: 'forum-users',
    templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {
    user: User;
    users: User[];
    currentPage: number;
    totalElements: number;
    pageSize: number;
    maxSize: number;

    constructor(@Inject('adminService') private adminService: IAdminService,
                @Inject('userService') private userService: IUserService) {
    }

    ngOnInit(): void {
        this.maxSize = Constants.getMaxSize();
        this.getAll();
    }

    getAll(urlParams?: URLSearchParams) {
        if (!urlParams) {
            urlParams = new URLSearchParams();
        }
        urlParams.append(Constants.getSortParam(), 'id');
        urlParams.append(Constants.getSizeParam(), String(Constants.getPageSize()));

        this.adminService.getAllUsers(urlParams)
            .then((page: Page<User>) => {
                this.users = page.content;
                this.currentPage = page.number + 1;
                this.totalElements = page.totalElements;
                this.pageSize = page.size;
            })
            .catch(err => console.log(err));
    }

    onDelete(id: number) {
        this.userService.deleteById(id);
        console.log('Delete button was pressed. User id is ' + id);
    }

    onPageChange() {
        let params = new URLSearchParams();
        params.append(Constants.getPageParam(), String(this.currentPage - 1));
        this.getAll(params);
    }
}
