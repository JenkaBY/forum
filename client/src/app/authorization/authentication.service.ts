import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/observable/of';
import 'rxjs/add/operator/do';

import IUserService from "../user/interface/iuser.service";
import { UserCredential } from "./user-credential.model";
import { RoutesConst } from "../shared/constants/routes.constants";
import { OAuthTokensData } from "./oauth-token.model";
import { AppConstant } from "../shared/constants/app-constant";
import { User } from "../shared/entity/user";
import { HeaderConst, OAuthConst, RoleConst } from "../shared/constants/constants";

@Injectable()
export class AuthenticationService {
  currentUser: User;
  changedCurrentUser = new Subject<User>();
  private oauthToken: OAuthTokensData;
  private expireTokenDate: Date;

  constructor(@Inject('userService') private userService: IUserService,
              private http: HttpClient,
              private router: Router) {
  }

  login(userCredential: UserCredential) {
    return this.requestOAuthToken(userCredential);
  }

  logout() {
    this.http.post(RoutesConst.logout, null, {observe: 'response'})
      .subscribe((response) => {
          if (response.status == 200) {
            this.eraseUserData();
            console.log("logout success 200", this.currentUser);
          }
          //TODO flash !!!
          this.eraseUserData();
          console.log("logout Other", this.currentUser);
        },
        (err) => {
          if (err.status == 200) {
            this.eraseUserData();
            console.log("logout error 200", this.currentUser);
          }
          console.log("logout error", err, this.currentUser);
          //TODO flash !!!
        })
  }

  // oauth/token?grant_type=refresh_token&refresh_token=094b7d23-973f-4cc1-83ad-8ffd43de184
  private requestOAuthToken(userCredential?: UserCredential): Observable<User> {
    return this.http.post(RoutesConst.OAUTH_TOKEN,
      null,
      this.getAuthorizationParams(userCredential))
      .do((resInfo: OAuthTokensData) => {
          this.oauthToken = resInfo;
          this.currentUser = this.oauthToken.user;
          this.changedCurrentUser.next(this.oauthToken.user);
          this.saveTokenInLocalStorage();
          this.setExpireTokenDate();
          return Observable.of(this.currentUser);
        },
        (err: HttpErrorResponse) => {
          console.log('Invalid credential!', err);
          return Observable.of(this.currentUser);
        });
  }

  private eraseUserData(): void {
    this.currentUser = null;
    this.oauthToken = null;
    this.eraseLocalStorage();
    this.changedCurrentUser.next();
  }

  public getAuthorizationHeaders(): HttpHeaders {
    const headerObj = {};
    headerObj[HeaderConst.accept] = HeaderConst.jsonType;
    headerObj[HeaderConst.authorization] = HeaderConst.basic + btoa(AppConstant.getClientId + ':' + AppConstant.getSecret);
    const headers = new HttpHeaders(headerObj);
    return headers;
  }

  public getAuthorizationHeader(): string {
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
    return new Date().getTime() >= this.expireTokenDate.getTime();
  }

  private setExpireTokenDate(): void {
    const date = new Date();
    date.setMinutes(date.getMinutes() + this.oauthToken.expires_in);
    this.expireTokenDate = date;
  }

  get getCurrentUser(): User {
    if (!this.currentUser) {
      this.autoLogin();
    }
    this.changedCurrentUser.next(this.currentUser);
    console.log("getCurrent user in AuthServ after if", this.currentUser);
    return this.currentUser;
  }

  get isManager(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.role.title === RoleConst.MANAGER;
  }

  get isAdmin(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.role.title === RoleConst.ADMIN;
  }

  get isUser(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.role.title === RoleConst.USER;
  }

  get isUserOrManager(): boolean {
    return this.isManager || this.isUser;
  }

  private authDataStr = 'authData';

  private saveTokenInLocalStorage(): void {
    localStorage.setItem(this.authDataStr, JSON.stringify({tokenObj: this.oauthToken}));
  }

  private eraseLocalStorage() {
    localStorage.removeItem(this.authDataStr);
  }

  autoLogin(): boolean {
    const authData = JSON.parse(localStorage.getItem(this.authDataStr));
    if (authData) {
      this.oauthToken = authData.tokenObj;
      this.changedCurrentUser.next(this.oauthToken.user);
      console.log('autologin in if', authData);
    }
    return !!authData;
  }
}
