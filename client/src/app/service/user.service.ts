import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Routes } from '../common/routes.constants';
import { User } from '../model/user';
import IUserService from './interface/iuser.service';
import { Page } from '../common/Page';

@Injectable()
export class UserService implements IUserService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private  http: Http) {
    }

    getAllUsers(urlParams?: URLSearchParams): Promise<Page<User>> {
        let params = new RequestOptions({params: urlParams});
        return this.http.get(Routes.ADMIN_ALL_USERS, params)
            .toPromise()
            .then(response => {
                //TODO delete console log
                console.log(response);
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    getById(id: number): Promise<User> {
        return this.http.get(Routes.USER + id)
            .toPromise()
            .then(response => {
                //TODO delete console log
                console.log(response);
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    deleteById(id: number): void {
        let params = new RequestOptions({headers: this.headers});

        this.http.delete(Routes.USER + id, params)
            .subscribe(res => console.log(res.json()));
    }


    update(user: User): Promise<User> {
        let params = new RequestOptions({headers: this.headers});
        return this.http.put(Routes.USER + user.id, JSON.stringify(user), params)
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
        //TODO delete console log
        console.log(error);
        return null;
    }
}
