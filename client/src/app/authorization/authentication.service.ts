import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/observable/of';
import 'rxjs/add/operator/do';

import IUserService from '../user/interface/iuser.service';
import { UserCredential } from './user-credential';
import { RoutesConst } from '../shared/constants/routes.constants';
import { OAuthTokensData } from './oauth-token.model';
import { AppConstant } from '../shared/constants/app-constant';
import { User } from '../shared/entity/user';
import { HeaderConst, OAuthConst } from '../shared/constants/constants';
import { environment } from '../../environments/environment.prod';

/**
 * Authentication service. Manages the authentication and makes Token requests to backend
 */
@Injectable()
export class AuthenticationService {
  currentUser: User;
  changedCurrentUser = new Subject<User>();
  private oauthToken: OAuthTokensData;
  private expireTokenDate: Date;
  private authDataStr = 'authData';

  constructor(@Inject('cacheableUserService') private userService: IUserService,
              private http: HttpClient,
              private router: Router) {
  }

  /**
   * Login an user according to user credential
   * @param {UserCredential} userCredential contains email, password and remebemberMe params.
   * @returns {Observable<OAuthTokensData>} token data
   */
  login(userCredential: UserCredential): Observable<OAuthTokensData> {
    return this.requestOAuthToken(userCredential);
  }

  /**
   * Logout current user. Erases user data from localStorage and varaibles.
   */
  logout() {
    this.http.post(RoutesConst.logout, null, {observe: 'response'})
      .subscribe((response) => {
          this.eraseUserData();
        },
        (err) => {
          if (!environment.production) {
            console.log('logout error', err, this.currentUser);
          }
          this.eraseUserData();
        });
  }

  // oauth/token?grant_type=refresh_token&refresh_token=094b7d23-973f-4cc1-83ad-8ffd43de184
  private requestOAuthToken(userCredential?: UserCredential): Observable<OAuthTokensData> {
    return this.http.post(RoutesConst.OAUTH_TOKEN,
      null,
      this.getAuthorizationParams(userCredential))
      .do((resInfo: OAuthTokensData) => {
          this.oauthToken = resInfo;
          this.currentUser = this.oauthToken.user;
          this.changedCurrentUser.next(this.oauthToken.user);
          this.saveTokenInLocalStorage(userCredential.rememberMe);
          this.setExpireTokenDate();
        },
        (err: HttpErrorResponse) => {
          // console.log('Invalid credential!', err);
          // this.resolveErrorInToken(err);
        });
  }

  private resolveErrorInToken(error: HttpErrorResponse) {
    console.log('message', error.message);
    console.log('error', error.error);
    console.log('status', error.status);
    console.log('status text', error.statusText);
  }

  private eraseUserData(): void {
    this.currentUser = null;
    this.oauthToken = null;
    this.eraseLocalStorage();
    this.changedCurrentUser.next();
  }

  /**
   * Get header params for making requests for logged user
   * @returns {HttpHeaders} headers with basic auth params of encoded client credential
   */
  public getAuthorizationHeaders(): HttpHeaders {
    const headerObj = {};
    headerObj[HeaderConst.accept] = HeaderConst.jsonType;
    headerObj[HeaderConst.authorization] = HeaderConst.basic + btoa(AppConstant.getClientId + ':' + AppConstant.getSecret);
    const headers = new HttpHeaders(headerObj);
    return headers;
  }

  /**
   * Returns header with access token
   * @returns {string} header with access token or null if user not logged in.
   */
  public getAuthorizationAccessTokenHeader(): string {
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

  /**
   * place current user in Subject object and returns current user
   * @returns {User} logged user
   */
  get getCurrentUser(): User {
    this.changedCurrentUser.next(this.currentUser);
    return this.currentUser;
  }

  private saveTokenInLocalStorage(rememberMe: boolean): void {
    if (!rememberMe) {
      return;
    }
    localStorage.setItem(this.authDataStr, JSON.stringify({tokenObj: this.oauthToken}));
  }

  private eraseLocalStorage() {
    localStorage.removeItem(this.authDataStr);
  }

  /**
   * Tries to load from local storage auth data, if data exists and token doesn't expire then sets current user
   * If token expire then erase auth data from local storage and variables.
   */
  tryAutoLogin() {
    const authData = JSON.parse(localStorage.getItem(this.authDataStr));
    if (authData) {
      this.oauthToken = authData.tokenObj;
      this.currentUser = this.oauthToken.user;
      this.setExpireTokenDate();
      this.changedCurrentUser.next(this.currentUser);
      this.checkAndDeleteAuthData();
    }
  }

  private checkAndDeleteAuthData() {
    if (this.isAccessTokenExpired()) {
      this.eraseUserData();
    }
  }
}
