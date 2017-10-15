import { AbstractEntity } from './abstract-entity';
import { User } from './user';

export class Topic extends AbstractEntity {
    title: string;
    createdBy: User;
  description: string;
  imagePath: string;
  allowedUser: Set<User>;
}
