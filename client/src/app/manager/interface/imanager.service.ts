import { Observable } from 'rxjs/Observable';

import { TopicRequest } from '../../shared/entity/topic-request';
import { Page } from '../../shared/entity/page';
import { HttpParams } from '@angular/common/http';

/**
 * Service for ManagerDashboard
 */
interface IManagerService {

  getAllPendingCreateTopicRequests(httpParams?: HttpParams): Observable<Page<TopicRequest>>;

  updateCreateTopicRequest(topicRequest: TopicRequest);
}

export default IManagerService;
