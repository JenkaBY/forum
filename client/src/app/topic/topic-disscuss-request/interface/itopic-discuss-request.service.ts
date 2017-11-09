import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

import { TopicDiscussRequest } from '../../../shared/entity/topic-discuss-request';
import { Page } from '../../../shared/entity/page';

/**
 * Service for TopicDiscussRequest
 */
interface ITopicDiscussRequestService {

  createRequest(topicDiscussRequest: TopicDiscussRequest): Observable<TopicDiscussRequest>;

  getAllPending(httpParams?: HttpParams): Observable<Page<TopicDiscussRequest>>;

  getByTopicIdAndUserId(topicId: number, userId: number): Observable<TopicDiscussRequest>;

  updateRequest(topicDiscussRequest: TopicDiscussRequest): Observable<boolean>;

  getAllRequestsByUserId(userId: number, httpParams?: HttpParams): Observable<Page<TopicDiscussRequest>>;

  deleteDiscussRequest(discussRequest: TopicDiscussRequest): any;
}

export default ITopicDiscussRequestService;
