import { AbstractEntity } from './abstract-entity';

export class Role extends AbstractEntity {
  title: string;
}

const user = "USER";
const admin = "ADMIN";
const manager = "MANAGER";

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
}
