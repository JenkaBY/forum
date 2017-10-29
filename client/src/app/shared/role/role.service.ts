import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Role } from '../entity/role';
import { RoutesConst } from '../constants/routes.constants';
import IRoleService from './irole.service';


@Injectable()
export class RoleService implements IRoleService {
  private roles: Role[];

  constructor(private  http: HttpClient) {
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(RoutesConst.ALL_ROLES);
  }

  private initializeRoles() {
    this.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getRoles(): Role[] {
      return null;
  }
}
