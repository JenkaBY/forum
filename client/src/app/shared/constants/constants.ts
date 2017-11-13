const dateTimeFormat = 'yyyy/MM/dd HH:mm';
const dateFormat = 'yyyy/MM/dd';
const pageSize = 5;
const maxSize = 5;
const pageParam = 'page';
const sortParam = 'sort';
const sizeParam = 'size';
const id = 'id';
const minNameLength = {value: 4};
const maxNameLength = {value: 20};
const minPasswordLength = {value: 6};
const maxPasswordLength = {value: 16};
const maxLengthTopicTitle = {value: 255};
const maxLengthTopicDescription = {value: 500};
const grantTypePsw = 'grant_type';
const grantTypeValuePsw = 'password';
const refreshToken = 'refresh_token';
const grantTypeValueToken = 'refresh_token';
const password = 'password';
const username = 'username';
const managerStr = 'MANAGER';
const adminStr = 'ADMIN';
const systemStr = 'SYSTEM';
const userStr = 'USER';
const contentType = 'Content-Type';
const accept = 'Accept';
const bearer = 'Bearer ';
const basic = 'Basic ';
const authorization = 'Authorization';
const jsonType = 'application/json';
const multipartFormData = 'multipart/form-data';
const en = 'en';
const ru = 'ru';

export class RoleConst {
  static get SYSTEM(): string {
    return systemStr;
  }
  static get MANAGER(): string {
    return managerStr;
  }

  static get ADMIN(): string {
    return adminStr;
  }

  static get USER(): string {
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

  static get multipartFormData(): string {
    return multipartFormData;
  }

  static get contentType(): string {
    return contentType;
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
  static get id(): string {
    return id;
  }

  static get getMaxLengthTopicTitle(): { value: number } {
    return maxLengthTopicTitle;
  }

  static get getMaxLengthTopicDescription(): { value: number } {
    return maxLengthTopicDescription;
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
