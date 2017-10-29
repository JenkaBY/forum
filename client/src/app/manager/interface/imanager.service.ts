import { Observable } from 'rxjs/Observable';

import { TopicRequest } from '../../shared/entity/topic-request';
import { Page } from '../../shared/entity/page';

/**
 * Service for ManagerDashboard
 */
interface IManagerService {

  getAllPendingCreateTopicRequests(): Observable<Page<TopicRequest>>;

}

export default IManagerService;
