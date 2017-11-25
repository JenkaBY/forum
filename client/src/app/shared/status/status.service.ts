import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { Status } from '../entity/status';
import IStatusService from './istatus.service';
import { ApiConst } from '../constants/routes.constants';
import { StatusConst } from '../entity/topic-discuss-request';

@Injectable()
export class StatusService implements IStatusService {
  private statuses: Status[];

  constructor(private  http: HttpClient) {
  }

  getStatuses(): Observable<Status[]> {
    if (this.statuses) {
      return Observable.of(this.statuses);
    }
    return this.http.get<Status[]>(ApiConst.GET_ALL_STATUSES)
      .do((statuses: Status[]) => {
        this.statuses = statuses;
      });
  }

  getPendingStatus(): Status {
    return this.statuses.find(status => status.title === StatusConst.PENDING);
  }

  getApprovedStatus(): Status {
    return this.statuses.find(status => status.title === StatusConst.APPROVED);
  }

  getRejectedStatus(): Status {
    return this.statuses.find(status => status.title === StatusConst.REJECTED);
  }
}
