import { Observable } from 'rxjs/Observable';
import { Status } from '../entity/status';

interface IStatusService {

  getStatuses(): Observable<Status[]>;

  getPendingStatus(): Status;

  getApprovedStatus(): Status;

  getRejectedStatus(): Status;
}

export default IStatusService;
