import { AbstractEntity } from './abstract-entity';
import { User } from './user';

export class Topic extends AbstractEntity {
  title: string;
  createdBy: User;
  createdById: number;
  description: string;
  imagePath: string;
  allowedUsers: User[];
  allowedUserIds: number[];
}
