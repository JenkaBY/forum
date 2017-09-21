import { AbstractEntity } from './abstract-entity';
import { User } from './user';
import { Topic } from './topic';

export class Message extends AbstractEntity {
    text: string;
    createdBy: User;
    updatedBy: User;
    updatedAt: Date;
    inTopic: Topic;
}
