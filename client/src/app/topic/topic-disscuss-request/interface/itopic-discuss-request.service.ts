import { Observable } from "rxjs/Observable";

import { TopicDiscussRequest } from "../../../shared/entity/topic-discuss-request";
import { Page } from "../../../shared/entity/page";

/**
 * Service for TopicDiscussRequest
 */
interface ITopicDiscussRequestService {

  createRequest(topicDiscussRequest: TopicDiscussRequest): Observable<TopicDiscussRequest>;

  getAllPending(): Observable<Page<TopicDiscussRequest>>;

  getByTopicIdAndUserId(topicId: number, userId: number): Observable<TopicDiscussRequest>;
}

export default ITopicDiscussRequestService;
