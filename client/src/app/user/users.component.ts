import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../model/user';
import IUserService from '../service/interface/iuser.service';
import * as _ from 'underscore';

@Component({
    selector: 'forum-users',
    templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {
    user: User;
    users: User[];

    constructor(@Inject('userService') private userService: IUserService) {
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.userService.getAllUsers()
            .then((users: User[]) => this.users = _.sortBy(users, 'id'));
    }
}
