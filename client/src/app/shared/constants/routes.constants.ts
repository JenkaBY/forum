const API = 'api';
const ADMIN = 'admin';
const USER = 'user';
const NEW = 'new';
const USERS = 'users';
const ALL = 'all';
const TOPIC = 'topic';
const MESSAGE = 'message';
const APPROVED = 'approved';
const BLOCKED = 'blocked';
const REJECTED = 'rejected';
const PENDING = 'pending';
const TOKEN = 'token';
const OAUTH = 'oauth';
const CONGRATULATION = 'congratulation';
const PROJECT_NAME = '';
const LOGOUT = 'logout';
const DISCUSS_REQUEST = 'discuss_request';

export class RoutesConst {

  static get PROJECT_NAME(): string {
    return PROJECT_NAME;
  }

  static get GET_ALL_TOPIC_DISCUSS_REQUESTS(): string {
    return RoutesConst.routeFormatAll(TOPIC, DISCUSS_REQUEST, ALL);
  }

  static NEW_TOPIC_DISCUSS_REQUESTS(topicId: number): string {
    return RoutesConst.routeFormatAll(TOPIC, String(topicId), `${DISCUSS_REQUEST}/${NEW}`);
  }

  static GET_TOPIC_DISCUSS_REQUEST(topicId: number) {
    return RoutesConst.routeFormatAll(TOPIC, String(topicId), DISCUSS_REQUEST)
  }

  static get logout(): string {
    return RoutesConst.routeFormatOne(LOGOUT);
  }

  static get congratulation(): string {
    return CONGRATULATION;
  }

  static get OAUTH_TOKEN(): string {
    return RoutesConst.routeFormatTwo(OAUTH, TOKEN);
  }

  static get ADMIN_ALL_USERS(): string {
    return RoutesConst.routeFormatAll(ADMIN, USER, ALL);
  }

  static get ADMIN_USERS_PENDING_TO_APPROVE(): string {
    return RoutesConst.routeFormatAll(ADMIN, USER, PENDING);
  }

  static get ADMIN_APPROVED_USERS(): string {
    return RoutesConst.routeFormatAll(ADMIN, USER, APPROVED);
  }

  static get ADMIN_REJECTED_USERS(): string {
    return RoutesConst.routeFormatAll(ADMIN, USER, REJECTED);
  }

  static get ADMIN_BLOCKED_USERS(): string {
    return RoutesConst.routeFormatAll(ADMIN, USER, BLOCKED);
  }

  static get USER(): string {
    return RoutesConst.routeFormatOne(USER);
  }

  static get CREATE_NEW_USER(): string {
    return RoutesConst.routeFormatTwo(USER, NEW);
  }

  static get ALL_TOPIC(): string {
    return RoutesConst.routeFormatTwo(TOPIC, ALL);
  }

  static get TOPIC(): string {
    return RoutesConst.routeFormatOne(TOPIC);
  }

  static get MESSAGE(): string {
    return this.routeFormatOne(MESSAGE);
  }

  static get CREATE_NEW_MESSAGE(): string {
    return this.routeFormatTwo(MESSAGE, NEW);
  }

  static get users(): string {
    return USERS;
  }

  static get pending(): string {
    return PENDING;
  }

  static get approved(): string {
    return APPROVED;
  }

  static get rejected(): string {
    return REJECTED;
  }

  static get blocked(): string {
    return BLOCKED;
  }

  private static routeFormatAll(path1: string, path2: string, path3: string) {
    return PROJECT_NAME + API + '/' + path1 + '/' + path2 + '/' + path3;
  }

  private static routeFormatOne(path1: string) {
    return PROJECT_NAME + API + '/' + path1 + '/';
  }

  private static routeFormatTwo(path1: string, path2: string) {
    return PROJECT_NAME + API + '/' + path1 + '/' + path2;
  }

}
