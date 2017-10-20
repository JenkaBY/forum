import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

import IUserService from "../service/interface/iuser.service";
import { UserCredential } from "./user-credential.model";
import { RoutesConstants } from "../common/routes.constants";
import { OAuthTokensResponse } from "./oauth-token.model";
import { AppConstant } from "../common/app-constant";
import { User } from "../model/user";
import { Constants, OAuthConst, RoleConstant } from "../common/constants";

@Injectable()
export class AuthenticationService {
  currentUser: User;
  private oauthToken: OAuthTokensResponse;
  private expireTokenDate: Date;

  constructor(@Inject('userService') private userService: IUserService,
              private http: HttpClient) {
  }

  login(userCredential: UserCredential) {

    this.requestOAuthToken(userCredential);
  }

  logout() {
    this.currentUser = null;
    this.oauthToken = null;
  }

  // oauth/token?grant_type=refresh_token&refresh_token=094b7d23-973f-4cc1-83ad-8ffd43de184
  private requestOAuthToken(userCredential?: UserCredential): void {
    this.http.post(RoutesConstants.OAUTH_TOKEN,
      null,
      this.getAuthorizationParams(userCredential))
    // .toPromise()
      .subscribe((resInfo: OAuthTokensResponse) => {
        console.log('login then ' + JSON.stringify(resInfo));
        // this.oauthToken = res;
        // this.currentUser = this.oauthToken.user;
        // this.setExpireTokenDate();
      })
    // .catch(err => {
    //   this.oauthToken = null;
    //   this.currentUser = null;
    //   console.log('catch ' + err);
    //   return err;
    // });
  }

  public getAuthorizationHeaders(): HttpHeaders {
    const headerObj = {};
    headerObj[Constants.accept] = Constants.jsonType;
    headerObj['Authorization'] = 'Basic ' + btoa(AppConstant.getClientId + ':' + AppConstant.getSecret);
    const headers = new HttpHeaders(headerObj);
    console.log("Authorize Headers " + headers.get('Authorization'));
    console.log("Authorize Headers " + headers.get(Constants.accept));
    return headers;
  }

  public getAuthorizationHeader(): string {
    console.log('Bearer ' + this.oauthToken.access_token ? this.oauthToken.access_token : '******************');
    return this.oauthToken && !this.isAccessTokenExpired() ? 'Bearer ' + this.oauthToken.access_token : null;
  }

  private getAuthorizationURLParams(userCredential: UserCredential): HttpParams {
    const params = new HttpParams()
      .set(OAuthConst.getGrantType, OAuthConst.getGrantTypeValuePsw)
      .set(OAuthConst.getUsernameStr, userCredential.email)
      .set(OAuthConst.getPasswordStr, userCredential.password);
    console.log("HttpParams: " + params.get(OAuthConst.getGrantType));
    console.log("HttpParams: " + params.get(OAuthConst.getUsernameStr));
    console.log("HttpParams: " + params.get(OAuthConst.getPasswordStr));
    return params;
  }

  private getRefreshTokenURLParams(): HttpParams {
    const params = new HttpParams();
    params.append(OAuthConst.getGrantType, OAuthConst.getGrantTypeValueToken);
    params.append(OAuthConst.getRefreshTokenStr, this.oauthToken.refresh_token);
    return params;
  }

  private getAuthorizationParams(userCredential?: UserCredential) {
    return {
      headers: this.getAuthorizationHeaders(),
      params: userCredential ? this.getAuthorizationURLParams(userCredential) : this.getRefreshTokenURLParams()
    };
  }

  private isAccessTokenExpired(): boolean {
    return new Date().getTime() >= this.expireTokenDate.getTime();
  }

  private setExpireTokenDate(): void {
    let date = new Date();
    date.setMinutes(date.getMinutes() + this.oauthToken.expires_in);
    this.expireTokenDate = date;
  }

  get getCurrentUser(): User {
    return this.currentUser;
  }

  get isManager(): boolean {
    return this.currentUser.role.title === RoleConstant.manager;
  }

  get isAdmin(): boolean {
    return this.currentUser.role.title === RoleConstant.admin;
  }

  get isUser(): boolean {
    return this.currentUser.role.title === RoleConstant.user;
  }
}
