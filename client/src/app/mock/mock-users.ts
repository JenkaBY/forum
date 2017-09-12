import { User } from '../model/user';

export const USERS: User[] = [
    {
        id: 1,
        firstName: 'Vitaliy',
        lastName: 'Sergey',
        email: 'email@mail.ru',
        hashPassword: 'password',
        admin: true,
        blocked: false,
        deleted: true,
        createdAt: new Date('2017-08-24T20:55:44.982Z'),
        lastLogonAt: new Date('2017-08-24T20:55:44.982Z')
    },
    {
        id: 2,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        email: 'email2@mail.ru',
        hashPassword: 'password',
        admin: false,
        blocked: false,
        deleted: false,
        createdAt: new Date('2017-08-24T20:55:44.982Z'),
        lastLogonAt: new Date('2017-08-24T20:55:44.982Z')
    },
    {
        id: 3,
        firstName: 'Yauhen',
        lastName: 'Kuzmich',
        email: 'email3@mail.ru',
        hashPassword: 'password',
        admin: true,
        blocked: false,
        deleted: false,
        createdAt: new Date('2017-08-24T20:55:44.982Z'),
        lastLogonAt: new Date('2017-08-24T20:55:44.982Z')
    }
];
