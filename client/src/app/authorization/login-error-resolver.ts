import { LoginError } from './login-error';
import { LoginErrorConst } from '../shared/constants/login-constnant';

/**
 * Class resolves what translation key should be returned if error occurred during log in.
 */
export class LoginErrorResolver {
  /**
   * @param {LoginError} loginError object see {@link LoginError}
   */
  constructor(private loginError: LoginError) {
  }

  /**
   * Resolves what translation key should be returned if error occurred during log in.
   * Result depends on login_error.error_description field. Default result is 'LOGIN.BAD_CREDENTIAL'
   * @returns {string} translation key from *.JSON file for ng2-translation module
   */
  getTranslationKey(): string {
    switch (this.loginError.error_description) {
      case LoginErrorConst.disabledUser: {
        return 'MESSAGES.DISABLED_USER';
      }
      case LoginErrorConst.lockedAccount: {
        return 'MESSAGES.LOCKED_ACCOUNT';
      }
      default: {
        return 'MESSAGES.INVALID_CREDENTIAL';
      }
    }
  }
}