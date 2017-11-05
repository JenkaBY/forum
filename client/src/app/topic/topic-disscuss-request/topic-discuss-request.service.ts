import { HeaderConst } from '../../shared/constants/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RoutesConst } from '../../shared/constants/routes.constants';
import ITopicDiscussRequestService from './interface/itopic-discuss-request.service';
import { TopicDiscussRequest } from '../../shared/entity/topic-discuss-request';
import { Page } from '../../shared/entity/page';
import { User } from '../../shared/entity/user';
import IUserService from '../../user/interface/iuser.service';
import ITopicService from '../interface/itopic.service';
import { Topic } from '../../shared/entity/topic';

/**
 * Service for TopicDiscussRequest
 */
@Injectable()
export class TopicDiscussRequestService implements ITopicDiscussRequestService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient,
              @Inject('userService') private userService: IUserService,
              @Inject('topicService') private topicService: ITopicService) {
  }

  createRequest(topicDiscussRequest: TopicDiscussRequest): Observable<TopicDiscussRequest> {
    return this.http.post<TopicDiscussRequest>(
      RoutesConst.NEW_TOPIC_DISCUSS_REQUESTS(topicDiscussRequest.inTopic.id),
      topicDiscussRequest,
      {headers: this.headers});
  }

  updateRequest(topicDiscussRequest: TopicDiscussRequest): Observable<boolean> {
    return this.http.put(RoutesConst.UPDATE_DISCUSS_REQUEST(topicDiscussRequest.id),
      topicDiscussRequest, {headers: this.headers});
  }

  getAllPending(httpParams?: HttpParams): Observable<Page<TopicDiscussRequest>> {
    let oldPage;
    let result = this.http.get(RoutesConst.GET_ALL_TOPIC_DISCUSS_REQUESTS, {params: httpParams})
      .map((page: Page<TopicDiscussRequest>) => {
        oldPage = page;
        return page.content;
      })
      .flatMap((requests: TopicDiscussRequest[]) => {
        if (requests.length > 0) {
          return Observable.forkJoin(
            requests.map((request: TopicDiscussRequest) => {
              return this.userService.getById(request.requestedBy.id)
                .map((user: User) => {
                  request.requestedBy = user;
                  return request;
                });
            })
          );
        }
        return Observable.of([]);
      })
      .flatMap((requests: TopicDiscussRequest[]) => {
        if (requests.length > 0) {
          return Observable.forkJoin(
            requests.map((request: TopicDiscussRequest) => {
              return this.topicService.getById(request.inTopic.id)
                .map((topic: Topic) => {
                  request.inTopic = topic;
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

  getByTopicIdAndUserId(topicId: number, userId: number): Observable<TopicDiscussRequest> {
    const params = new HttpParams().set('userId', String(userId));
    return this.http.get(RoutesConst.GET_TOPIC_DISCUSS_REQUEST(topicId), {params: params});
  }
}
