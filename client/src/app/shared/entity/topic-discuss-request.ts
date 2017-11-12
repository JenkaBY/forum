import { AbstractEntity } from './abstract-entity';
import { Topic } from './topic';
import { User } from './user';

export class TopicDiscussRequest extends AbstractEntity {
  requestedBy: User;
  approvedBy: User;
  approvedAt: Date;
  requestedById: number;
  inTopic: Topic;
  status: string;
}

const PENDING = 'PENDING';
const APPROVED = 'APPROVED';
const REJECTED = 'REJECTED';

export class Status {
  static get PENDING() {
    return PENDING;
  }

  static get APPROVED() {
    return APPROVED;
  }

  static get REJECTED() {
    return REJECTED;
  }
}
