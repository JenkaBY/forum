import { AbstractEntity } from './abstract-entity';
import { Role } from './role';

export class User extends AbstractEntity {
  name: string;
  email: string;
  imagePath: string;
  hashPassword: string;
  lastLogonAt: Date;
  blocked: boolean;
  rejected: boolean;
  approvedBy: User;
  role: Role;
}
