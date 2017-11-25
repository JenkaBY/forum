import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Role } from '../entity/role';
import { RoutesConst } from '../constants/routes.constants';
import IRoleService from './irole.service';


@Injectable()
export class RoleService implements IRoleService {
  private roles: Role[];

  constructor(private  http: HttpClient) {
  }

  getRoles(): Observable<Role[]> {
    if (this.roles) {
      return Observable.of(this.roles);
    }
    return this.http.get<Role[]>(RoutesConst.ALL_ROLES)
      .do((roles: Role[]) => this.roles = roles);
  }
}
