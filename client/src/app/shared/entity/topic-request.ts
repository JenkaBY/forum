import { User } from './user';
import { Topic } from './topic';
import { AbstractVersioningEntity } from './abstract/abstract-versioning-entity';
import { Status } from './status';

export class TopicRequest extends AbstractVersioningEntity {
  requestedTopicTitle: string;
  requestedTopicDescription: string;
  requestedById: number;
  requestedBy: User;
  createdTopic: Topic;
  status: Status;
  reason: string;
}
