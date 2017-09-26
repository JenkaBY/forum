const API = 'api';
const ADMIN = 'admin';
const USER = 'user';
const ALL = 'all';
const TOPIC = 'topic';
const MESSAGE = 'message';
const APPROVED = 'approved';
const BLOCKED = 'blocked';
const REJECTED = 'rejected';
const PENDING = 'pending';

export class Routes {

    public static get PROJECT_NAME(): string {
        return 'forum';
    }

    public static get ADMIN_ALL_USERS(): string {
        return Routes.routeFormat(ADMIN, USER, ALL);
    }

    public static get ADMIN_USERS_PENDING_TO_APPROVE(): string {
        return Routes.routeFormat(ADMIN, USER, PENDING);
    }

    public static get ADMIN_APPROVED_USERS(): string {
        return Routes.routeFormat(ADMIN, USER, APPROVED);
    }

    public static get ADMIN_REJECTED_USERS(): string {
        return Routes.routeFormat(ADMIN, USER, REJECTED);
    }

    public static get ADMIN_BLOCKED_USERS(): string {
        return Routes.routeFormat(ADMIN, USER, BLOCKED);
    }

    public static get USER(): string {
        return Routes.routeFormatOne(USER);
    }

    public static get ALL_TOPIC(): string {
        return Routes.routeFormatAll(TOPIC, ALL);
    }

    public static get TOPIC(): string {
        return Routes.routeFormatOne(TOPIC);
    }

    public static get MESSAGE(): string {
        return this.routeFormatOne(MESSAGE);
    }

    private static routeFormat(path1: string, path2: string, path3: string) {
        return API + '/' + path1 + '/' + path2 + '/' + path3;
    }

    private static routeFormatOne(path1: string) {
        return API + '/' + path1 + '/';
    }

    private static routeFormatAll(path1: string, path2: string) {
        return API + '/' + path1 + '/' + path2;
    }
}
