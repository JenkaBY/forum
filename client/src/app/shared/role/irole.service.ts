import { Role } from '../entity/role';
import { Observable } from 'rxjs/Observable';

interface IRoleService {

  getRoles(): Observable<Role[]>
}

export default IRoleService;
