import { Injectable } from '@angular/core';
import IUserService from './interface/iuser.service';
import { User } from '../model/user';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Routes } from '../common/routes.constants';

const PROJECT_NAME = '/forum/';
const SUCCESS = 'User was successfully updated.';
const CREATED = 'User was successfully created.';
const ERROR = 'Something went wrong! Server isn\'t available now.';


@Injectable()
export class UserService implements IUserService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private  http: Http) {
    }

    getAllUsers(): Promise<User[]> {
        return this.http.get(Routes.ADMIN_ALL_USERS)
            .toPromise()
            .then(response => {
                console.log(response);
                return response.json()['content'];
            })
            .catch(error => this.errorHandle(error));
    }

    getById(id: number): Promise<User> {
        return this.http.get(Routes.USER + id)
            .toPromise()
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    deleteById(id: number): void {
    }


    update(user: User): Promise<User> {
        return this.http.put(Routes.USER + user.id, JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    create(user: User): Promise<User> {
        return null;
    }

    private errorHandle(error): Promise<User> {
        console.log(error);
        return null;
    }
}
