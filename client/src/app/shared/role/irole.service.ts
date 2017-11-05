import { Role } from '../entity/role';
import { Observable } from 'rxjs/Observable';

interface IRoleService {

  getAllRoles(): Observable<Role[]>

  getRoles(): Role[];
}

export default IRoleService;
