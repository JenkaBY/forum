import { AbstractSystemEntity } from './abstract-system-entity';

export abstract class AbstractVersioningEntity extends AbstractSystemEntity {
    deleted: boolean;
    createdAt: Date;
  version: number;
}
