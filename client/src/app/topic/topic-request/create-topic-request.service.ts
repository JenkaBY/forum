import { HeaderConst } from '../../shared/constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RoutesConst } from '../../shared/constants/routes.constants';
import ITopicDiscussRequestService from './interface/icreate-topic-request.service';
import { Page } from '../../shared/entity/page';
import { TopicRequest } from '../../shared/entity/topic-request';

/**
 * Service for TopicDiscussRequest
 */
@Injectable()
export class TopicRequestService implements ITopicDiscussRequestService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient) {
  }

  createRequest(topicRequest: TopicRequest): Observable<TopicRequest> {
    return this.http.post(RoutesConst.NEW_TOPIC_REQUEST, topicRequest, {headers: this.headers});
  }

  getAllPending(): Observable<Page<TopicRequest>> {
    return null;
  }
}
