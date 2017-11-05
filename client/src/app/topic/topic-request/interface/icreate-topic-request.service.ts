import { Observable } from 'rxjs/Observable';

import { Page } from '../../../shared/entity/page';
import { TopicRequest } from '../../../shared/entity/topic-request';

/**
 * Service for TopicDiscussRequest
 */
interface ITopicRequestService {

  createRequest(topicRequest: TopicRequest): Observable<TopicRequest>;

  getAllPending(): Observable<Page<TopicRequest>>;

}

export default ITopicRequestService;
