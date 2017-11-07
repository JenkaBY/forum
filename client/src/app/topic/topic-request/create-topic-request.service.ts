import { HeaderConst } from '../../shared/constants/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RoutesConst } from '../../shared/constants/routes.constants';
import ITopicDiscussRequestService from './interface/icreate-topic-request.service';
import { Page } from '../../shared/entity/page';
import { TopicRequest } from '../../shared/entity/topic-request';
import IUserService from '../../user/interface/iuser.service';
import { User } from '../../shared/entity/user';

/**
 * Service for TopicDiscussRequest
 */
@Injectable()
export class TopicRequestService implements ITopicDiscussRequestService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient,
              @Inject('cacheableUserService') private userService: IUserService) {
  }

  /**
   * gets all pending to approve or reject the create topic requests.
   * @returns {Observable<Page<TopicRequest>>} Page with Pending to approve or reject the create topic requests
   */
  getAllPendingCreateTopicRequests(httpParams?: HttpParams): Observable<Page<TopicRequest>> {
    let oldPage;
    let result = this.http.get<Page<TopicRequest>>(RoutesConst.GET_ALL_PENDING_TOPIC_REQUESTS, {params: httpParams})
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

  createRequest(topicRequest: TopicRequest): Observable<TopicRequest> {
    return this.http.post(RoutesConst.NEW_TOPIC_REQUEST, topicRequest, {headers: this.headers});
  }

  getAllPending(): Observable<Page<TopicRequest>> {
    return null;
  }

  getAllRequestsByUserId(userId: number, httpParams: HttpParams): Observable<Page<TopicRequest>> {
    return this.http.get<Page<TopicRequest>>(RoutesConst.GET_ALL_USER_CREATE_TOPIC_REQUESTS, {params: httpParams});
  }

  updateCreateTopicRequest(topicRequest: TopicRequest): Observable<TopicRequest> {
    return this.http.put<TopicRequest>(`${RoutesConst.UPDATE_TOPIC_REQUEST}/${topicRequest.id}`, topicRequest, {headers: this.headers});
  }
}
