import { User } from './user';
import { Topic } from './topic';
import { AbstractVersioningEntity } from './abstract/abstract-versioning-entity';

export class Message extends AbstractVersioningEntity {
    text: string;
    createdBy: User;
    updatedBy: User;
    updatedAt: Date;
    inTopic: Topic;
}
