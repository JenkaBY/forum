import { HeaderConst } from "../../shared/constants/constants";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { RoutesConst } from "../../shared/constants/routes.constants";
import ITopicDiscussRequestService from "./interface/itopic-discuss-request.service"
import { TopicDiscussRequest } from "../../shared/entity/topic-discuss-request";
import { Page } from "../../shared/entity/page";

/**
 * Service for TopicDiscussRequest
 */
@Injectable()
export class TopicDiscussRequestService implements ITopicDiscussRequestService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient) {
  }

  createRequest(topicDiscussRequest: TopicDiscussRequest): Observable<TopicDiscussRequest> {
    return this.http.post<TopicDiscussRequest>(
      RoutesConst.NEW_TOPIC_DISCUSS_REQUESTS(topicDiscussRequest.inTopic.id),
      topicDiscussRequest,
      {headers: this.headers});
  }

  getAllPending(): Observable<Page<TopicDiscussRequest>> {
    return this.http.get(RoutesConst.GET_ALL_TOPIC_DISCUSS_REQUESTS);
  }

  getByTopicIdAndUserId(topicId: number, userId: number): Observable<TopicDiscussRequest> {
    const params = new HttpParams().set('userId', String(userId));
    return this.http.get(RoutesConst.GET_TOPIC_DISCUSS_REQUEST(topicId), {params: params});
  }

}
