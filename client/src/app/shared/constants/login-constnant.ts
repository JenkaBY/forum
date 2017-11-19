const LOCKED_ACCOUNT = 'User account is locked';
const DISABLED_USER = 'User is disabled';
const BAD_CREDENTIAL = 'Bad credentials';

export class LoginErrorConst {

  static get lockedAccount() {
    return LOCKED_ACCOUNT;
  }

  static get disabledUser() {
    return DISABLED_USER;
  }

  static get badCredential() {
    return BAD_CREDENTIAL;
  }
}