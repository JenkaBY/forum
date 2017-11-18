import { HeaderConst } from '../../shared/constants/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiConst, RoutesConst } from '../../shared/constants/routes.constants';
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
   * gets all pending to approve or reject the create topic requests. Fetches user data for createdById field in Topic object in parallel.
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

  /**
   * sends a request for creating TopicRequest given in the body
   * @param {TopicRequest} topicRequest data to be saved
   * @returns {Observable<TopicRequest>} observable of created topic
   */
  createRequest(topicRequest: TopicRequest): Observable<TopicRequest> {
    return this.http.post(RoutesConst.NEW_TOPIC_REQUEST, topicRequest, {headers: this.headers});
  }

  /**
   * Unimplemented method.
   * @returns {Observable<Page<TopicRequest>>}
   */
  getAllPending(): Observable<Page<TopicRequest>> {
    throw new Error('Unimplemented method');
  }

  /**
   * gets all topic discuss request by user ID.
   * @param {number} userId NOT USED
   * @param {HttpParams} httpParams params with userId=id in query string
   * @returns {Observable<Page<TopicRequest>>} observable of pageable with create TopicRequests data
   */
  getAllRequestsByUserId(userId: number, httpParams: HttpParams): Observable<Page<TopicRequest>> {
    return this.http.get<Page<TopicRequest>>(ApiConst.GET_ALL_USER_CREATE_TOPIC_REQUESTS, {params: httpParams});
  }

  /**
   * Updates given create topic request.
   * @param {TopicRequest} topicRequest data to be saved in DB
   * @returns {Observable<TopicRequest>} observable with updated topic request data
   */
  updateCreateTopicRequest(topicRequest: TopicRequest): Observable<TopicRequest> {
    return this.http.put<TopicRequest>(`${RoutesConst.TOPIC_REQUEST}/${topicRequest.id}`, topicRequest, {headers: this.headers});
  }

  /**
   * Deletes the topic request
   * @param {number} id of topic request to be deleted
   * @returns {Observable<any>} observable of any with reponse result
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${RoutesConst.TOPIC_REQUEST}/${id}`, {headers: this.headers, observe: 'response'});
  }
}
