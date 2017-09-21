const API = 'api';
const ADMIN = 'admin';
const USER = 'user';
const ALL = 'all';
const TOPIC = 'topic';
const MESSAGE = 'message';

export class Routes {

    public static get PROJECT_NAME(): string {
        return 'forum';
    }

    public static get ADMIN_USER_ALL(): string {
        return Routes.routeFormat(ADMIN, USER, ALL);
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
