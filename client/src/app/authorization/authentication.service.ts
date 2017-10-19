import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/toPromise';

import { UserCredential } from "./user-credential.model";
import { RoutesConstants } from "../common/routes.constants";
import { OAuthToken } from "./oauth-token.model";
import { AppConstant } from "../common/app-constant";
import { User } from "../model/user";
import { Constants, OAuthConst, RoleConstant } from "../common/constants";
import IUserService from "../service/interface/iuser.service";

@Injectable()
export class AuthenticationService {
  currentUser: User;
  private oauthToken: OAuthToken;
  private expireTokenDate: Date;

  constructor(@Inject('userService') private userService: IUserService,
              private http: Http) {
  }

  login(userCredential: UserCredential): Promise<OAuthToken> {
    return this.requestOAuthToken(userCredential);
  }

  // oauth/token?grant_type=refresh_token&refresh_token=094b7d23-973f-4cc1-83ad-8ffd43de184
  private requestOAuthToken(userCredential?: UserCredential): Promise<OAuthToken> {
    return this.http.post(RoutesConstants.OAUTH_TOKEN, null, this.getAuthorizationParams(userCredential))
      .toPromise()
      .then(res => {
        console.log('login then ' + JSON.stringify(res.json()));
        this.oauthToken = res.json();
        this.setExpireTokenDate();
      })
      // .then(() => this.userService.getById())
      .catch(err => {
        this.oauthToken = null;
        console.log('catch ' + err);
        return err;
      });
  }

  private getAuthorizationHeader(): Headers {
    let headers = new Headers();
    headers.set(Constants.accept, Constants.jsonType);
    headers.append('Authorization', 'Basic ' + btoa(AppConstant.getClientId + ':' + AppConstant.getSecret));

    console.log("Authorize Headers " + JSON.stringify(headers));
    return headers;
  }

  private getAuthorizationURLParams(userCredential: UserCredential): URLSearchParams {
    const params = new URLSearchParams();
    params.append(OAuthConst.getGrantType, OAuthConst.getGrantTypeValuePsw);
    params.append(OAuthConst.getUsernameStr, userCredential.email);
    params.append(OAuthConst.getPasswordStr, userCredential.password);
    return params;
  }

  private getRefreshTokenURLParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append(OAuthConst.getGrantType, OAuthConst.getGrantTypeValueToken);
    params.append(OAuthConst.getRefreshTokenStr, this.oauthToken.refresh_token);
    return params;
  }

  private getAuthorizationParams(userCredential?: UserCredential): RequestOptionsArgs {
    const options = {
      headers: this.getAuthorizationHeader(),
      params: userCredential ? this.getAuthorizationURLParams(userCredential) : this.getRefreshTokenURLParams()
    };
    return options;
  }

  private isAccessTokenIxpired(): boolean {
    return this.oauthToken.expires_in == null;
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
