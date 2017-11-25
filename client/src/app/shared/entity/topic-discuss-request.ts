import { Topic } from './topic';
import { User } from './user';
import { AbstractVersioningEntity } from './abstract/abstract-versioning-entity';
import { Status } from './status';

export class TopicDiscussRequest extends AbstractVersioningEntity {
  requestedBy: User;
  approvedBy: User;
  approvedAt: Date;
  requestedById: number;
  inTopic: Topic;
  status: Status;
}

const PENDING = 'PENDING';
const APPROVED = 'APPROVED';
const REJECTED = 'REJECTED';

export class StatusConst {
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
