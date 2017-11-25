import { Role } from './role';
import { AbstractVersioningEntity } from './abstract/abstract-versioning-entity';

export class User extends AbstractVersioningEntity {
  name: string;
  email: string;
  imagePath: string;
  password: string;
  lastLogonAt: Date;
  blocked: boolean;
  rejected: boolean;
  approverId: number;
  role: Role;
}
