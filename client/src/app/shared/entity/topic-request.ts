import { AbstractEntity } from './abstract-entity';
import { User } from './user';
import { Topic } from './topic';

export class TopicRequest extends AbstractEntity {
  requestedTopicTitle: string;
  requestedTopicDescription: string;
  requestedById: number;
  requestedBy: User;
  createdTopic: Topic;
  status: string;
  reason: string;
}
