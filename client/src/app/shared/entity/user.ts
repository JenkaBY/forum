import { AbstractEntity } from './abstract-entity';
import { Role } from './role';

export class User extends AbstractEntity {
  name: string;
  email: string;
  imagePath: string;
  password: string;
  lastLogonAt: Date;
  blocked: boolean;
  rejected: boolean;
  approver_id: number;
  role: Role;
}
