const dateTimeFormat = 'yyyy/MM/dd HH:mm';
const dateFormat = 'yyyy/MM/dd';
const pageSize = 5;
const maxSize = 5;
const pageParam = 'page';
const sortParam = 'sort';
const sizeParam = 'size';
const minNameLength = {value: 4};
const maxNameLength = {value: 20};
const minPasswordLength = {value: 6};
const maxPasswordLength = {value: 16};
const grantTypePsw = 'grant_type';
const grantTypeValuePsw = 'password';
const refreshToken = 'refresh_token';
const grantTypeValueToken = 'refresh_token';
const password = 'password';
const username = 'username';
const managerStr = 'MANAGER';
const adminStr = 'ADMIN';
const userStr = 'USER';
const contentType = 'Content-Type';
const accept = 'Accept';
const bearer = 'Bearer ';
const basic = 'Basic ';
const authorization = 'Authorization';
const jsonType = 'application/json';
const en = 'en';
const ru = 'ru';

export class RoleConstant {
  static get manager(): string {
    return managerStr;
  }

  static get admin(): string {
    return adminStr;
  }

  static get user(): string {
    return userStr;
  }
}

export class HeaderConst {
  static get authorization(): string {
    return authorization;
  }

  static get accept(): string {
    return accept;
  }

  static get jsonType(): string {
    return jsonType;
  }

  static get bearer(): string {
    return bearer;
  }

  static get basic(): string {
    return basic;
  }
}

export class OAuthConst {
  static get getGrantType(): string {
    return grantTypePsw;
  }

  static get getGrantTypeValuePsw(): string {
    return grantTypeValuePsw;
  }

  static get getGrantTypeValueToken(): string {
    return grantTypeValueToken;
  }

  static get getPasswordStr(): string {
    return password;
  }

  static get getUsernameStr(): string {
    return username;
  }

  static get getRefreshTokenStr(): string {
    return refreshToken;
  }
}

export class LanguageConst {
  static get en() {
    return en;
  }

  static get ru() {
    return ru;
  }
}

export class Constants {
  static get contentApplicationType(): string {
    return contentType;
  }

  static get accept(): string {
    return accept;
  }

  static get jsonType(): string {
    return jsonType;
  }

  static get getMinNameLength(): { value: number } {
    return minNameLength;
  }

  static get getMaxNameLength(): { value: number } {
    return maxNameLength;
  }

  static get getMinPasswordLength(): { value: number } {
    return minPasswordLength;
  }

  static get getMaxPasswordLength(): { value: number } {
    return maxPasswordLength;
  }


  static get getDateTimeFormat(): string {
    return dateTimeFormat;
  }

  static get getDateFormat(): string {
    return dateFormat;
  }

  static get getPageSize(): number {
    return pageSize;
  }

  static get getPageParam(): string {
    return pageParam;
  }

  static get getSortParam(): string {
    return sortParam;
  }

  static get getSizeParam(): string {
    return sizeParam;
  }

  static get getMaxSize(): number {
    return maxSize;
  }
}
