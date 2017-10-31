import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

import { RoutesConst } from '../shared/constants/routes.constants';
import { Page } from '../shared/entity/page';
import IManagerService from './interface/imanager.service';
import { TopicRequest } from '../shared/entity/topic-request';
import IUserService from '../user/interface/iuser.service';
import { User } from '../shared/entity/user';
import { HeaderConst } from '../shared/constants/constants';

/**
 * Interface for TopicRequests service
 * "/topic/request"
 *  /pending
 */
@Injectable()
export class ManagerService implements IManagerService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient,
              @Inject('userService') private userService: IUserService) {
  }

  /**
   * gets all pending to approve or reject the create topic requests.
   * @returns {Observable<Page<TopicRequest>>} Page with Pending to approve or reject the create topic requests
   */
  getAllPendingCreateTopicRequests(): Observable<Page<TopicRequest>> {
    let oldPage;
    let result = this.http.get<Page<TopicRequest>>(RoutesConst.GET_ALL_PENDING_TOPIC_REQUESTS)
      .map((page: Page<TopicRequest>) => {
        oldPage = page;
        return page.content;
      })
      .flatMap((requests: TopicRequest[]) => {
        if (requests.length > 0) {
          return Observable.forkJoin(
            requests.map((request: TopicRequest) => {
              return this.userService.getById(request.requestedById)
                .map((user: User) => {
                  request.requestedBy = user;
                  return request;
                });
            })
          );
        }
        return Observable.of([]);
      })
      .map((array) => {
        oldPage.content = array;
        return oldPage;
      });
    return result;
  }

  updateCreateTopicRequest(topicRequest: TopicRequest) {
    return this.http.put<TopicRequest>(`${RoutesConst.UPDATE_TOPIC_REQUEST}/${topicRequest.id}`, topicRequest, {headers: this.headers});
  }

}
