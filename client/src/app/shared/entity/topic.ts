import { User } from './user';
import { AbstractVersioningEntity } from './abstract/abstract-versioning-entity';

export class Topic extends AbstractVersioningEntity {
  title: string;
  createdBy: User;
  createdById: number;
  description: string;
  imagePath: string;
  allowedUsers: User[];
  allowedUserIds: number[];
}
