import { AbstractSystemEntity } from './abstract/abstract-system-entity';

export class Role extends AbstractSystemEntity {
  title: string;
}

const user = 'USER';
const admin = 'ADMIN';
const manager = 'MANAGER';
const system = 'SYSTEM';

export class UserRole {
  static get USER(): string {
    return user;
  }

  static get ADMIN(): string {
    return admin;
  }

  static get MANAGER(): string {
    return manager;
  }

  static get SYSTEM(): string {
    return system;
  }
}
