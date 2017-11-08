import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

import { Page } from '../../../shared/entity/page';
import { TopicRequest } from '../../../shared/entity/topic-request';

/**
 * Service for TopicDiscussRequest
 */
interface ITopicRequestService {
  getAllPendingCreateTopicRequests(httpParams?: HttpParams): Observable<Page<TopicRequest>>;

  createRequest(topicRequest: TopicRequest): Observable<TopicRequest>;

  getAllPending(): Observable<Page<TopicRequest>>;

  getAllRequestsByUserId(userId: number, httpParams: HttpParams): Observable<Page<TopicRequest>>;

  updateCreateTopicRequest(topicRequest: TopicRequest): Observable<TopicRequest>

  delete(id: number): Observable<any>;
}

export default ITopicRequestService;
