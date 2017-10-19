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
const PROJECT_NAME = '';

export class RoutesConstants {

  public static get PROJECT_NAME(): string {
    return PROJECT_NAME;
  }

  public static get OAUTH_TOKEN(): string {
    return RoutesConstants.routeFormatTwo(OAUTH, TOKEN);
  }

  public static get ADMIN_ALL_USERS(): string {
    return RoutesConstants.routeFormatAll(ADMIN, USER, ALL);
  }

  public static get ADMIN_USERS_PENDING_TO_APPROVE(): string {
    return RoutesConstants.routeFormatAll(ADMIN, USER, PENDING);
  }

  public static get ADMIN_APPROVED_USERS(): string {
    return RoutesConstants.routeFormatAll(ADMIN, USER, APPROVED);
  }

  public static get ADMIN_REJECTED_USERS(): string {
    return RoutesConstants.routeFormatAll(ADMIN, USER, REJECTED);
  }

  public static get ADMIN_BLOCKED_USERS(): string {
    return RoutesConstants.routeFormatAll(ADMIN, USER, BLOCKED);
  }

  public static get USER(): string {
    return RoutesConstants.routeFormatOne(USER);
  }

  public static get CREATE_NEW_USER(): string {
    return RoutesConstants.routeFormatTwo(USER, NEW);
  }

  public static get ALL_TOPIC(): string {
    return RoutesConstants.routeFormatTwo(TOPIC, ALL);
  }

  public static get TOPIC(): string {
    return RoutesConstants.routeFormatOne(TOPIC);
  }

  public static get MESSAGE(): string {
    return this.routeFormatOne(MESSAGE);
  }

  public static get users(): string {
    return USERS;
  }

  public static get pending(): string {
    return PENDING;
  }

  public static get approved(): string {
    return APPROVED;
  }

  public static get rejected(): string {
    return REJECTED;
  }

  public static get blocked(): string {
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
