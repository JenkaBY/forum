import { Injectable } from '@angular/core';
import IUserService from './interface/iuser.service';
import { User } from '../model/user';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { USERS } from '../mock/mock-users';

const PROJECT_NAME = '/userfaces/'
const GET_ALL = 'api/user/all';
const GET_ONE = 'api/user/';
const SUCCESS = 'User was successfully updated.';
const CREATED = 'User was successfully created.';
const ERROR = 'Something went wrong! Server isn\'t available now.';


@Injectable()
export class UserService implements IUserService {
    mockUsers: User[] = USERS;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private  http: Http) {
    }

    getAllUsers(): Promise<User[]> {
        return this.http.get(GET_ALL)
            .toPromise()
            .then(response =>
            {console.log(response);
                return response.json();})
            .catch(error => this.errorHandle(error));
    }

    getById(id: number): Promise<User> {
        return this.http.get(GET_ONE + id)
            .toPromise()
            .then(response => {
                console.log(response);
                return response.json();})
            .catch(error => this.errorHandle(error));
    }

    deleteById(id: number): void {
    }


    update(user: User): Promise<User> {
        return this.http.put(GET_ONE + user.id, JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    create(user: User): Promise<User> {
        return null;
    }

    getMockFirstUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.mockUsers[0]);
        });
    }

    getAllMockUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mockUsers);
        });
    }

    private errorHandle(error): Promise<User> {
        console.log(error);
        return null;
    }
}
