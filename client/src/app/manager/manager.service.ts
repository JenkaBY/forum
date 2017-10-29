import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RoutesConst } from '../shared/constants/routes.constants';
import { Page } from '../shared/entity/page';
import IManagerService from './interface/imanager.service';
import { TopicRequest } from '../shared/entity/topic-request';


/**
 * Interface for TopicRequests service
 * "/topic/request"
 *  /pending
 */
@Injectable()
export class ManagerService implements IManagerService {

  constructor(private  http: HttpClient) {
  }

  /**
   * gets all pending to approve or reject the create topic requests.
   * @returns {Observable<Page<TopicRequest>>} Page with Pending to approve or reject the create topic requests
   */
  getAllPendingCreateTopicRequests(): Observable<Page<TopicRequest>> {
    return this.http.get<Page<TopicRequest>>(RoutesConst.GET_ALL_PENDING_TOPIC_REQUESTS);
  }
}
