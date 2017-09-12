import { AbstractEntity } from './abstract-entity';

export class User extends AbstractEntity {
    firstName: string;
    lastName: string;
    email: string;
    hashPassword: string;
    lastLogonAt: Date;
    blocked: boolean;
    admin: boolean;
}
