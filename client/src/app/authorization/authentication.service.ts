import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import 'rxjs/observable/of';
import 'rxjs/add/operator/do';

import IUserService from "../service/interface/iuser.service";
import { UserCredential } from "./user-credential.model";
import { RoutesConst } from "../common/routes.constants";
import { OAuthTokensData } from "./oauth-token.model";
import { AppConstant } from "../common/app-constant";
import { User } from "../model/user";
import { HeaderConst, OAuthConst, RoleConstant } from "../common/constants";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthenticationService {
  currentUser: User;
  private oauthToken: OAuthTokensData;
  private expireTokenDate: Date;

  constructor(@Inject('userService') private userService: IUserService,
              private http: HttpClient) {
  }

  login(userCredential: UserCredential) {
    return this.requestOAuthToken(userCredential);
  }

  logout() {
    this.eraseUserData();
  }

  // oauth/token?grant_type=refresh_token&refresh_token=094b7d23-973f-4cc1-83ad-8ffd43de184
  private requestOAuthToken(userCredential?: UserCredential): Observable<boolean> {
    return this.http.post(RoutesConst.OAUTH_TOKEN,
      null,
      this.getAuthorizationParams(userCredential))
      .do((resInfo: OAuthTokensData) => {
          this.oauthToken = resInfo;
          console.log('tokens', this.oauthToken);
          this.currentUser = this.oauthToken.user;
          this.setExpireTokenDate();
          console.log('user', this.currentUser);
          return Observable.of(true);
        },
        (err: HttpErrorResponse) => {
          console.log('Invalid credential!', err);
          return Observable.of(false);
        });
  }

  private eraseUserData(): void {
    this.currentUser = null;
    this.oauthToken = null;
  }

  public getAuthorizationHeaders(): HttpHeaders {
    const headerObj = {};
    headerObj[HeaderConst.accept] = HeaderConst.jsonType;
    headerObj[HeaderConst.authorization] = HeaderConst.basic + btoa(AppConstant.getClientId + ':' + AppConstant.getSecret);
    const headers = new HttpHeaders(headerObj);
    return headers;
  }

  public getAuthorizationHeader(): string {
    console.log(!!this.oauthToken);
    console.log(HeaderConst.bearer, this.oauthToken ? this.oauthToken.access_token : '********');
    return this.oauthToken && !this.isAccessTokenExpired() ? HeaderConst.bearer + this.oauthToken.access_token : null;
  }

  private getAuthorizationURLParams(userCredential: UserCredential): HttpParams {
    const params = new HttpParams()
      .set(OAuthConst.getGrantType, OAuthConst.getGrantTypeValuePsw)
      .set(OAuthConst.getUsernameStr, userCredential.email)
      .set(OAuthConst.getPasswordStr, userCredential.password);
    return params;
  }

  private getRefreshTokenURLParams(): HttpParams {
    const params = new HttpParams()
      .set(OAuthConst.getGrantType, OAuthConst.getGrantTypeValueToken)
      .set(OAuthConst.getRefreshTokenStr, this.oauthToken.refresh_token);
    return params;
  }

  private getAuthorizationParams(userCredential?: UserCredential) {
    return {
      headers: this.getAuthorizationHeaders(),
      params: userCredential ? this.getAuthorizationURLParams(userCredential) : this.getRefreshTokenURLParams()
    };
  }

  private isAccessTokenExpired(): boolean {
    console.log('time', this.expireTokenDate.getTime());
    return new Date().getTime() >= this.expireTokenDate.getTime();
  }

  private setExpireTokenDate(): void {
    const date = new Date();
    date.setMinutes(date.getMinutes() + this.oauthToken.expires_in);
    this.expireTokenDate = date;
  }

  get getCurrentUser(): User {
    return this.currentUser;
  }

  get isManager(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.role.title === RoleConstant.manager;
  }

  get isAdmin(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.role.title === RoleConstant.admin;
  }

  get isUser(): boolean {
    return this.currentUser.role.title === RoleConstant.user;
  }
}
